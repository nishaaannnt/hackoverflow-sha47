### Controllers are basically functions which are ran for a route. 

### Example - 

```app.get('/',(req,res)=>{
    res.send("Hello World")
});```

this is a sample route.

if we make a function in controller folder as below

```const homePage=(req,res)=>{
    res.send("Hello World)
};```


now we can use it in our route as


``` app.get('/',homepage)
```


this above function 'homepage' is called as controller


