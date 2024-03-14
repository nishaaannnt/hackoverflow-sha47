import React, { useState } from 'react';

const Chatbot = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const questionsAndAnswers = {
    "en": {
      "What is your name?": "I am the Help Bot.",
      "How can I get help?": "You can click on any predefined question to get an answer.",
      "Where can I find more information?": "For more information, visit our website's About Page.",
      "How to know about camera model?": "Please refer to the details label on the camera box.",
       "What is visibility Range ? ":"Maximum range of camera (eg:- 10m). For more details, refer details lable on camera box",
        "How to get Latitude and Longitude":"Search your shop location, if not accurate drag the marker",
        "How to know about camera model":"Please refer details lable on camera box"
      // Add more English questions and answers as needed
    },
    "hi": {
      "आपका क्या नाम है?": "मैं हेल्प बॉट हूँ।",
      "मुझे मदद कैसे मिल सकती है?": "आप किसी भी पूर्वनिर्धारित सवाल पर क्लिक करके जवाब प्राप्त कर सकते हैं।",
      "मुझे अधिक जानकारी कहां से मिल सकती है?": "अधिक जानकारी के लिए, हमारी वेबसाइट पर About page पर जाएं।",
      "अक्षांश और देशांतर कैसे प्राप्त करें": "अपनी दुकान का स्थान खोजें, यदि सटीक नहीं है तो मार्कर को पकड़कर खींचें",
      "कैमरा मॉडल के बारे में कैसे जानें": "कृपया कैमरा बॉक्स पर उपलब्ध विवरण देखें",
      "अक्षांश और देशांतर कैसे प्राप्त करें": "बस मानचित्र पर क्लिक करें और अपनी दुकान का पता लगाएं",
      "कैमरा मॉडल के बारे में कैसे जानें": "कृपया कैमरा बॉक्स पर उपलब्ध विवरण देखें"
      // Add more Hindi questions and answers as needed
    }
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setCurrentQuestion(null);
  };

  const handleQuestionClick = (question) => {
    setCurrentQuestion(question);
  };

  const renderQuestions = () => {
    const questions = Object.keys(questionsAndAnswers[selectedLanguage]);
  
    return questions.map((question, index) => (
      <div key={index} className="mb-2 bg-gray-100 px-1">
        {renderQuestionElement(question)}
      </div>
    ));
  };
  
  const renderQuestionElement = (question) => {
    const hasSubquestions = typeof questionsAndAnswers[selectedLanguage][question] === 'object';
  
    return (
      <div
        onClick={() => handleQuestionClick(question)}
        className={`p-2 cursor-pointer hover:bg-gray-200 ${currentQuestion === question ? 'bg-gray-300' : ''}`}
      >
        {question}
        {hasSubquestions && currentQuestion === question && (
          <div className="ml-4">
            {renderSubquestions(questionsAndAnswers[selectedLanguage][question])}
          </div>
        )}
      </div>
    );
  };
  
  const renderSubquestions = (subquestions) => {
    return Object.keys(subquestions).map((subquestion, index) => (
      <div
        key={index}
        onClick={() => handleQuestionClick(subquestion)}
        className={`p-2 cursor-pointer hover:bg-gray-200 ${currentQuestion === subquestion ? 'bg-gray-300' : ''}`}
      >
        {subquestion}
      </div>
    ));
  };

  const renderAnswer = () => {
    const answer = questionsAndAnswers[selectedLanguage][currentQuestion];
  
    const renderSubquestions = (subquestions) => {
      return Object.keys(subquestions).map((subquestion, index) => (
        <div
          key={index}
          onClick={() => handleQuestionClick(subquestion)}
          className={`p-2 cursor-pointer hover:bg-gray-200 ${
            currentQuestion === subquestion ? 'bg-gray-300' : ''
          }`}
        >
          {subquestion}
        </div>
      ));
    };
  
    if (typeof answer === 'string') {
      return (
        <div className="p-4 bg-gray-200 rounded-lg mt-2">
          <div className="text-gray-700">{answer}</div>
          <button
            onClick={() => setCurrentQuestion(null)}
            className="mt-2 px-4 py-2 bg-green-700 text-white rounded-md"
          >
            Back to Questions
          </button>
        </div>
      );
    } else if (typeof answer === 'object') {
      const subQuestions = renderSubquestions(answer);
  
      return (
        <div className="p-4 bg-gray-200 rounded-lg mt-2">
          {subQuestions}
          <button
            onClick={() => setCurrentQuestion(null)}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
          </button>
        </div>
      );
    }
  
    return null;
  };
  

  return (
    <div className="chatbot py-8 px-8 w-[400px]">
      <div className="language-selector flex gap-4 my-5">
        <button className='bg-green-700 hover:bg-green-800 text-white px-3 py-1 rounded ' onClick={() => handleLanguageChange('en')}>English</button>
        <button className='bg-green-700 hover:bg-green-800 text-white px-3 py-1 rounded ' onClick={() => handleLanguageChange('hi')}>हिन्दी</button>
      </div>

      <div className="questions ">{renderQuestions()}</div>

      {currentQuestion && (
        <div className="response">
          {renderAnswer()}
        </div>
      )}
    </div>
  );
};

export default Chatbot;
