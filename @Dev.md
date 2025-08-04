# 목표
  사용자 관리 및 Todo 관리를 nodejs 프로그램으로 개발한다 
  nodejs application, 
  express package 
  ejs view template 

# database environment 
database: tododb
table: users table 
        최소한 컬럼 필요하며 추가로 필요한 컬럼이 있으면 추가해 줘  
          user_id : auto_increment, PK
          email: varchar, unique 
          user_name: varchar
          created_at: datetime 
 
table: todos table 
        최소한 컬럼 필요하며 추가로 필요한 컬럼이 있으면 추가해 줘  
          todo_id : auto_increment, PK
          user_id : users.user_id 컬럼 
          title : varchar
          is_completed : boolean 
          created_at : datetime 
          

# logic 
1. 로그인 화면 
   ID/PASSWD sigin 화면 
   회원가입을 하지 않은 사람을 위해 signup 가입화면 

   간단하게 id / password는 암호화 없이 plaintext로 처리 

2. Todo List 화면 
   초기에 해야할 목록을 표시한다. 
   갯수가 많을 수 있으니 page navigation 필요 
   최근 날짜 순으로 표시 

3. Todo에서  수정 / 삭제 기능 필요 

4. Admin 관리자 화면 
   email 값이 admin 일 경우, 사용자 조회, 수정, 삭제 화면 필요 


