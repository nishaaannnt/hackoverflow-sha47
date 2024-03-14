import numpy as np
import cv2
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.image import MIMEImage
from PIL import Image
from datetime import datetime
import psycopg2
from twilio.rest import Client


def send_email(image_data, tampering_time, camera_id):
    # Replace these with your email and server details
    sender_email = "shreeyashk1202@gmail.com"
    sender_password = "zhif abdy kmgr wwxg"
    receiver_emails = ["shreeyash4567@gmail.com"]
    smtp_server = "smtp.gmail.com"
    smtp_port = 587

    subject = "Tampering Alert"

    # Create the email message
    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = ", ".join(receiver_emails)
    msg['Subject'] = subject

    # Attach the image to the email
    img = Image.fromarray(image_data)
    img.save("tampering_alert.jpg")
    with open("tampering_alert.jpg", "rb") as img_file:
        img_data = img_file.read()

    image = MIMEImage(img_data, name="tampering_alert.jpg")
    msg.attach(image)

    # Connect to the SMTP server and send the email
    with smtplib.SMTP(smtp_server, smtp_port) as server:
        server.starttls()
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, receiver_emails, msg.as_string())

    # Store tampering time in PostgreSQL
    try:
        connection = psycopg2.connect(
            user="postgres",
            password="qstar",
            host="localhost",
            port="5433",
            database="ML",
        )

        cursor = connection.cursor()
        cursor.execute("INSERT INTO tampering_events (camera_id, timestamp) VALUES (%s, %s)",
                       (camera_id, tampering_time))
        connection.commit()

    except (Exception, psycopg2.Error) as error:
        print(f"Error while connecting to PostgreSQL: {error}")

    finally:
        if connection:
            cursor.close()
            connection.close()

def get_or_create_camera_id(cursor, connection):
    #  create a unique camera ID
    cursor.execute("SELECT id FROM cameras LIMIT 1;")
    result = cursor.fetchone(  )
   
def update_camera_status(cursor, connection, camera_id, status):
    try:
        cursor.execute("UPDATE camera_status SET status = %s, timestamp = %s WHERE camera_id = %s",
                       (status, datetime.now(), camera_id))
        connection.commit()

    except (Exception, psycopg2.Error) as error:
        print(f"Error while updating camera status in PostgreSQL: {error}")

def main():
    try:
        # Initialize cursor and connection
        connection = psycopg2.connect(
            user="postgres",
            password="qstar",
            host="localhost",
            port="5433",
            database="ML",
        )
        cursor = connection.cursor()

        # Video capturing starts
        camera_sources = [0,1,"http://192.168.100.137:4747/video"]  # Add more camera sources as needed
        cap_list = [cv2.VideoCapture(source) for source in camera_sources]

        if any(not camera.isOpened() for camera in cap_list):
            raise Exception("Error: Could not open camera.")

        fgbg = cv2.createBackgroundSubtractorMOG2(history=500, detectShadows=False)
        kernel = np.ones((5, 5), np.uint8)

        tampering_counter = 0
        tampering_start_time = None
        camera_id = get_or_create_camera_id(cursor, connection)

        while True:
            frames = [cap.read() for cap in cap_list]
            if any(not ret for ret, _ in frames):
                print("End of frame or error in reading frame.")
                # Update camera status to Inactive when the camera is shut down
                update_camera_status(cursor, connection, camera_id, "Inactive")

                # Send email notification for inactive camera
                send_email(frames[0], datetime.now(), camera_id, subject="Camera Inactive Alert",body="camera not working Please check and service the camera")
                
                break

            # Combine frames for tampering detection
            combined_frame = np.hstack([frame for _, frame in frames])

            # Tampering detection logic
            fgmask = fgbg.apply(combined_frame)
            fgmask = cv2.erode(fgmask, kernel, iterations=5)
            fgmask = cv2.dilate(fgmask, kernel, iterations=5)

            contours, _ = cv2.findContours(fgmask, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
            tampering_detected = any(cv2.contourArea(contour) > 5000 for contour in contours)

            if tampering_detected:
                tampering_counter += 1
                if tampering_start_time is None:
                    tampering_start_time = datetime.now()

                elapsed_time = (datetime.now() - tampering_start_time).total_seconds()
                if tampering_counter >= 10 and elapsed_time <= 1:
                    cv2.putText(combined_frame, "TAMPERING DETECTED", (5, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 255), 2)
                    send_email(combined_frame, tampering_start_time, camera_id)
                    tampering_counter = 0
                    tampering_start_time = None

                elif elapsed_time > 1:
                    tampering_counter = 0
                    tampering_start_time = datetime.now()

            else:
                # If no tampering, update the camera activity status in the database
                update_camera_status(cursor, connection, camera_id, "Active")

            cv2.imshow("Tampering Detection SHA-47", combined_frame)

            if cv2.waitKey(5) & 0xFF == ord('q'):
                break

    except Exception as e:
        print(f"An error occurred: {e}")

    finally:
        for cap in cap_list:
            if cap.isOpened():
                cap.release()
        cv2.destroyAllWindows()
        # Close the cursor and connection in the finally block
        if 'cursor' in locals() and connection is not None:
            cursor.close()
            connection.close()

if __name__ == "__main__":
    main()