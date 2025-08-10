Blood_donars_website

Idea:" To create a platform that helps to merge the gap between blood donars and the blood needers(the emergency people,who wanted blood).
        So this a platform that maintains the details of a blood donars,the people who are in need can register to this website and find a donar's of 
        required blood group and try to contact them.Because this website provides you with donar's contact number,location,gender and their age.
        which would be helpful in finding donar based on age,location and gender over particular blood group"


Tech Stack : Frontend -> Next.js
             Styling  -> CSS 
             Backend  -> Flask,Python
             Database -> Supabase

Folder Allocation : Blood_donar folder --->as 2 folder inside
                                            >>Frontend &
                                            >>Backend


Direction to implement this project :   

1. Database :  ---- create a database in supabase
               ---- create a table users of fields( name,usn,role,dob,gender,bg( i.e bloodgroup ),location,contact ( i.e phone number ))
               ---- click on connect button on the navbar of the your project to get uri link to connect with backend : use direct link

2. Backend :   ---- create your virtual environment in your backend folder by---> python -m venv your_envname
               ---- type this code in terminal to install dependencies  >>pip install Flask (flask)
                                                                        >>pip install flask psycopg2-binary flask_sqlalchemy (posgresql to support supabase database )
                                                                        >>pip install cors
               ---- create app.py file and use my code
               ---- flask run (to run your backend)

3. Frontend :  ---- open frontend folder
               ---- npx create-next-app app
               ---- edit src and public folder by the code given by me and for styling view globals.css file
               ---- cd app
               ---- npm run dev (to start server)

   
                                      

                                    
