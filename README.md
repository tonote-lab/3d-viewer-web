# リアルタイム3Dポイントクラウドビューワー

WebSocketとThree.jsを使用して、ポイントクラウドデータをリアルタイムに表示するWebアプリケーション。

## 機能

- 30fpsでのリアルタイムポイントクラウド表示
- 視点の自由な操作
  - 回転（左クリック + ドラッグ）
  - パン（右クリック + ドラッグ）
  - ズーム（マウスホイール）
- パフォーマンス情報の表示
  - FPS
  - ポイント数
- デモ機能：動的に変化する球体のポイントクラウド（1000点）

## 技術スタック

### フロントエンド
- HTML5
- CSS3
- JavaScript (ES6+)
- Three.js (3Dレンダリング)
- WebSocket API (リアルタイム通信)

### バックエンド
- Python 3.x
- websockets (WebSocketサーバー)
- NumPy (ポイントクラウドデータ処理)

## セットアップ

### バックエンドのセットアップ

1. Pythonの依存関係をインストール:
```bash
cd backend
pip install -r requirements.txt
```

2. WebSocketサーバーを起動:
```bash
python server.py
```

### フロントエンドのセットアップ

1. 依存関係をインストール:
```bash
cd frontend
npm install
```

2. 開発サーバーを起動:
```bash
npm start
```

## 使用方法

1. バックエンドサーバーを起動
2. フロントエンド開発サーバーを起動
3. ブラウザで http://localhost:3000 にアクセス

## カスタマイズ

### ポイントクラウドデータソースの変更

`backend/server.py`の`generate_sample_point_cloud`メソッドを修正することで、異なるポイントクラウドデータを表示できます：

- LiDARデータの読み込み
- ROSトピックからのデータ取得
- その他のデータソースからの読み込み

### フロントエンドのカスタマイズ

`frontend/js/pointCloudViewer.js`で以下の設定を変更可能：

- ポイントの色や大きさ
- カメラの視点や設定
- レンダリングパラメータ

## コントリビューション

プロジェクトへの貢献を歓迎します！詳細は[CONTRIBUTING.md](CONTRIBUTING.md)をご覧ください。

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。詳細は[LICENSE](LICENSE)ファイルをご覧ください。

### 使用しているライブラリのライセンス

- **Three.js**: MIT License
- **websockets**: BSD License
- **NumPy**: BSD License
- **Node.js**: MIT License