const authenticate = ()=>{
    return (target,property,descriptor)=>{
        console.log('路由守护');
        console.log(target)
        const result = 'ok';
        if(result == "ok"){
            return property();
        }else{
            target.redirect("http://www.baidu.com");
        }
    }
};
export default authenticate;