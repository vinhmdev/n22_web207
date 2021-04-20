echo off
echo 'Dang chuan bi chay json-server voi file ./database.json'
echo 'De thoat, an CTRL + C, nhap vao Y, sau do an ENTER'
start "" http://localhost:3000
json-server -w ./database.json -p 3000
pause