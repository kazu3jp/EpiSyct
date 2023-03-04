# EpiSyctの基本的な使い方



## ログイン方法
<details>
<summary>回答</summary>

1. Annictで個人用アクセストークンを作成してください。  
   スコープは必ず｢読み込み + 書き込み｣で作成してください。  
   発行方法は[こちら](https://developers.annict.com/docs/authentication/personal-access-token)

2. EpiSyctに戻り作成したトークンを入力してログインボタンを押してください。
   > **Warning**
   >ログインに失敗する場合はトークンが間違っている可能性があります。

3. ログインに成功するとAnnictでステータスが｢見てる｣に設定しているアニメが表示されます。

   ![メイン画面](image\About\Main.png)
</details>



## 作品の切り替え方法
<details>
<summary>回答</summary>

1. 右上にある３本線のメニューアイコンを選択すると、Annictでステータスが｢見てる｣に設定しているアニメタイトルの一覧が表示されます。
   
   ![メニューの場所](image\About\Menu.png)

2. 切り替えたいアニメのタイトルを選択すると切り替わります。
</details>



## エピソードの記録方法
<details>
<summary>回答</summary>

1. 記録したい話数にある｢記録する｣ボタンを押すと記録されます。
   > **Note**
   > エピソードが無い場合は｢見た｣ステータスに変更するボタンが表示されます。

   > **Warning**
   >記録に失敗する場合はトークンのスコープが｢読み込み + 書き込み｣で作成されていない可能性があります。

   ![｢記録する｣ボタン](image\About\Watch-button.png)


### 一括記録したい場合
<details>
<summary>回答</summary>

1. ｢記録する｣ボタンの下にある下矢印を押すとほかのエピソードが表示されます。
   > **Note**
   > ほかのエピソードが無い場合は表示されません。

   ![ほかのエピソード表示ボタンの場所](image\About\Other-episode-menu.png)

2. 一括記録したい話数にある｢ここまで記録する｣ボタンを押すと一括記録されます。
   
   ![｢ここまで記録する｣ボタン](image\About\Other-episode-watch.png)
</details>
</details>



## データの更新方法
<details>
<summary>回答</summary>

- Annictで変更したことをEpiSyctに反映したい場合は、左上のアイコンを押すとデータが更新されて反映されます。
   > **Note**
   > ・サイトに再度アクセスするときに自動で更新されます。  
   > ・スマホやタブレットでアプリのように使用している場合は、タスクキルしてから再度アクセスするときに自動で更新されます。
   
   ![データを更新](image\About\Data-get.png)
</details>



## アプリのように使う方法
<details>
<summary>回答</summary>

- EpiSyctはPWAに対応しているため、アプリのように使用することができます。
  
### iOS
<details>
<summary>回答</summary>

1. SafariでEpiSyctのページを開いてください。
   
2. 画面下部の共有ボタンを押して｢ホーム画面に追加｣を押す。
   
   ![共有ボタンとホーム画面に追加の場所](image\About\PWA\iOS\iPhone-1&2.png)

3. 右上の｢追加｣を押すとホーム画面に追加されます。
   
   ![追加ボタンの場所とホームに追加された画像](image\About\PWA\iOS\iPhone-3&4.png)

4. ほかのアプリと同じように起動してお使い下さい。
   > **Note**
   > 再度ログインが必要です。
</details>

### Android
<details>
<summary>回答</summary>

1. ChromeでEpiSyctのページを開いてください。
   > **Note**
   > PWAに対応しているほかのブラウザでも可能です。

2. 下部に出てきた｢ホーム画面に EpiSyct を追加｣を押します。
   
   ![ホーム画面に EpiSyct を追加の場所](image\About\PWA\Android\Android-1.png)
   
3. インストールを押すとホーム画面にアイコンが追加されます。
   
   ![インストールを押す](image\About\PWA\Android\Android-2.png)
   
4. ほかのアプリと同じように起動してお使い下さい。
   > **Note**
   > 再度ログインが必要です。
</details>

### PC
<details>
<summary>回答</summary>

1. ChromeでEpiSyctのページを開いてください。
   > **Note**
   > PWAに対応しているほかのブラウザでも可能です。

2. 右上にあるアプリインストールボタンを押します。
   
   ![アプリインストールボタン](image\About\PWA\PC\PC-1.png)

3. インストールを押すと別のウィンドウでアプリが開きます。
   > **Note**
   > 再度ログインが必要です。
   
   ![インストールを押す](image\About\PWA\PC\PC-2.png)

4. ショートカットをデスクトップに表示したり、タスクバーにピン止めしたりできます。
</details>