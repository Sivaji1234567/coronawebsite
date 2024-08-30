import tornado.ioloop
import tornado.web
import requests
import json
import pymysql
import smtplib, ssl
import random
import jwt
import datetime


class BaseHandler(tornado.web.RequestHandler):
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "Authorization,x-requested-with, Content-Type, X-Rapidapi-Key")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')

    def options(self):
        self.set_status(204)
        self.finish()
def get_db_connection():
    return pymysql.connect(
        host='localhost',
        user='root',
        password='Nueve@123',
        db='covid',
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor
    )
class Regions(BaseHandler):
    def get(self):   
        url = "https://covid-19-statistics.p.rapidapi.com/regions"
        headers = {
            "X-Rapidapi-Key": "99e53335bfmsh8d45b605f576f52p1716bcjsn14a8f57559bd",
            "X-Rapidapi-Host": "covid-19-statistics.p.rapidapi.com"
        }
        response = requests.get(url, headers=headers)
        # token = self.request.headers.get('Authorization')
        self.write(response.json())
class Provinces(BaseHandler):
    
    def get(self):
        print("provinces called")
        global iso
        global name
        iso = self.get_argument('iso')
        url = f"https://covid-19-statistics.p.rapidapi.com/provinces?iso={iso}"
        headers = {
            "X-Rapidapi-Key": "99e53335bfmsh8d45b605f576f52p1716bcjsn14a8f57559bd",
            "X-Rapidapi-Host": "covid-19-statistics.p.rapidapi.com"
        }
        response = requests.get(url, headers=headers)
        res=response.json()
        self.write(res)
        #print(response.json())
class History(BaseHandler):
    def get(self):
        print("hello")
        token=(self.request.headers.get("Authorization"))
        print(token)
        if token:
            print('token')
            payload = jwt.decode(token,"abcdefgh", algorithms=["HS256"])
            print(payload)
            try:
                region_province = self.get_argument('region_province')
                iso = self.get_argument('iso')
                region_name = self.get_argument('region_name')
                date = self.get_argument('date')
                url = f"https://covid-19-statistics.p.rapidapi.com/reports?region_province={region_province}&iso={iso}&region_name={region_name}&date={date}"
                headers = {
                    "X-Rapidapi-Key": "99e53335bfmsh8d45b605f576f52p1716bcjsn14a8f57559bd",
                    "X-Rapidapi-Host": "covid-19-statistics.p.rapidapi.com"
                }
                response = requests.get(url, headers=headers)
                data = response.json()
                self.write(data)
                print(data)
            except jwt.ExpiredSignatureError:
                self.write("Token has expired")
            except jwt.InvalidTokenError:
                self.write("Invalid token")
        else:
            self.write("Token is missing")

class Signup(BaseHandler):
    def post(self):
        print("called")
        data = json.loads(self.request.body)
        email = data.get("email")
        password =data.get("password")
        connection = get_db_connection()
        with connection.cursor() as cursor:
            sql = "INSERT INTO users (email, password) VALUES (%s, %s)"
            cursor.execute(sql, (email, password))
            connection.commit()
            connection.close()
class Update(BaseHandler):
    def post(self):
        print(" update called")
        data = json.loads(self.request.body)
        email = data.get("email")
        password =data.get("password")
        connection = get_db_connection()
        with connection.cursor() as cursor:
            sql = "UPDATE users SET password = %s WHERE email = %s"
            cursor.execute(sql, (password,email))
            connection.commit()
            connection.close()
class Login(BaseHandler):
    def post(self):
        data = json.loads(self.request.body)

        email= data.get("email")
        password = data.get("password")
        connection = get_db_connection()
        with connection.cursor() as cursor:
            sql = "SELECT * FROM users WHERE email=%s AND password=%s"
            cursor.execute(sql, (email, password))
            user = cursor.fetchone()
        if user:
            secret="abcdefgh"
            payload_data={
                "email":email,
                "exp": datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(minutes=1)
            }
            token=jwt.encode(
                payload=payload_data,
                key=secret,
                algorithm='HS256'
                
            )
            # print(token)
            self.write({"status": "success", "message": "Login successful","token":token})
        else:
            self.set_status(401)
            self.write({"status": "error", "message": "Invalid username or password"})
       
        connection.close()
otpstore={}
class SendEmail(BaseHandler):
    async def post(self):
        print("called")
        data = json.loads(self.request.body)
        email=data.get("email")
        connection = get_db_connection()
        with connection.cursor() as cursor:
            sql = "SELECT * FROM users WHERE email=%s"
            cursor.execute(sql, (email))
            user = cursor.fetchone()
        if user:
            otp=""
            for i in range(6):
                otp+=str(random.randint(0,9))
        
            self.write("EMAIL SENDING")
            port = 465 
            smtp_server = "smtp.gmail.com"
            sender_email = "thomas.webeqt@gmail.com" 
            global receiver_email
            receiver_email=email
            otpstore[receiver_email]=otp
            password = "ulumouifaftzlhef"
            message = """\
            Subject: Hi there

            your otp for reset password is """+otp
            print(otpstore)
            context = ssl.create_default_context()
        
            with smtplib.SMTP_SSL(smtp_server, port, context=context) as server:
                server.login(sender_email, password)
                server.sendmail(sender_email, receiver_email, message)
            self.write({"status": "success", "message": "success"})
        else:
            self.set_status(401)
            self.write({"status": "error", "message": "Email not registered"})
       
        connection.close()
class Verify(BaseHandler):
    def post(self):
        data = json.loads(self.request.body)
        otp=data.get('otp')
        if otpstore[receiver_email]==otp:
            self.write({"status": "success", "message": "Login successful"})
        else:
            self.write({"status": "error", "message": "Invalid username or password"})
        # print(receiver_email,otp)
        # print("hello")

def make_app():
    print("entered into make app")
    return tornado.web.Application([
        ("/sendemail",SendEmail),
        ("/update",Update),
        ("/Regions",Regions),
        ("/prov",Provinces),
        ("/report",History),
        ('/signup',Signup),
        ('/login',Login),
        ('/verify',Verify),
    ])

if __name__ == "__main__":
    print("entered into main")
    app = make_app()
    app.listen(3003)
    tornado.ioloop.IOLoop.current().start()
