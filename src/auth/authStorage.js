const ACCESS_TOKEN='crm_access_token';
const USER='crm_user';
export const authStorage={
 getToken:()=>localStorage.getItem(ACCESS_TOKEN),
 setToken:t=>localStorage.setItem(ACCESS_TOKEN,t),
 getUser:()=>{try{return JSON.parse(localStorage.getItem(USER)||'null')}catch{return null}},
 setUser:u=>localStorage.setItem(USER,JSON.stringify(u)),
 clear:()=>{localStorage.removeItem(ACCESS_TOKEN);localStorage.removeItem(USER)}
};
