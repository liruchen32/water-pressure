# water-pressure

## 介紹

>這是一個可以從前端上傳 excel 儲存至資料庫後，將數據透過圖表的方式呈現的簡易專案

透過 `docker-compose` 指令啟動後前往 `localhost:8080/#/experiments`  
先增一個實驗後便可匯入該實驗的 excel 數據，可參考範例 `25-1-Table 1.xlsx`  
並可以看到 excel 匯入後的數值來檢查有無匯入錯誤
![image](https://user-images.githubusercontent.com/61230075/190362725-0fed7209-e5ee-4393-951a-3ac71b2abe64.png)

excel 所需要的欄位
| time        | benta       | merra       | image_url   |
| ----------- | ----------- | ----------- | ----------- |
| 10          | 0.256       | 0.114       | www.abc.com |
| 20          | 0.122       | 0.752       | www.abc.com |

完成後可回到首頁依照剛剛建立的實驗條件搜尋後，便能看到該實驗數據所呈現的圖表
![image](https://user-images.githubusercontent.com/61230075/190210949-71b07a06-c04a-485e-8565-6a1507e34a4c.png)
並可透過點擊圖表上的座標點來檢閱該數據下的圖片  
![Screen_Recording_2022-09-15_at_5_07_03_PM_AdobeExpress (1)](https://user-images.githubusercontent.com/61230075/190365068-9069958f-c2e8-404d-a4af-c8e08d0fd8b2.gif)


## 使用技術

資料庫: MySQL

後端: Express.js + Sequelize ORM

前端: Vue.js + Vuetify + echart.js

容器: Docker


## Project setup
```
docker compose -f ./docker-compose.yml up
```
