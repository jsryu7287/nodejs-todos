# echo "# nodejs-todos" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:jsryu7287/nodejs-todos.git
git push -u origin main


# 원격 URL을 HTTPS 방식으로 변경
git remote set-url origin https://github.com/your-username/your-repo.git
git remote -v

# 토큰 발급 방법: 
profile 우클릭 > settings > Developer settings > Personal access tokens > Tokens(classic) 

생성 후 토큰을 복사 (단 한 번만 보여짐!)

# Git push 시 토큰 사용
Username for 'https://github.com': your-username
Password for 'https://github.com': <여기에 Personal Access Token 입력> 

# 토큰을 캐시에 저장 (선택)
Mac / Linux:
git config --global credential.helper cache

Windows (Git Credential Manager 사용):
git config --global credential.helper manager-core
