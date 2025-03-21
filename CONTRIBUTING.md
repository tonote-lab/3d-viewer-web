# コントリビューションガイドライン

3Dポイントクラウドビューワープロジェクトへの貢献を検討していただき、ありがとうございます。以下のガイドラインに従ってコントリビューションを行ってください。

## イシューの報告

バグの報告や新機能の提案は、GitHubのイシュートラッカーを使用してください。

### バグ報告
- 明確なタイトルと説明
- 再現手順
- 期待される動作
- 実際の動作
- 環境情報（ブラウザ、OS、バージョンなど）
- 可能であればスクリーンショットや動画

### 機能提案
- 提案する機能の詳細な説明
- ユースケース
- 期待される利点

## プルリクエスト

1. フォークを作成
2. 新しいブランチを作成 (`git checkout -b feature/amazing_feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチをプッシュ (`git push origin feature/amazing_feature`)
5. プルリクエストを作成

### コーディング規約

#### JavaScript
- ESLintの設定に従う
- ES6+の機能を積極的に使用
- 適切なコメントを追加

#### Python
- PEP 8に準拠
- 型ヒントを使用
- docstringでドキュメント化

### コミットメッセージ

以下のプレフィックスを使用：
- `feat:` 新機能
- `fix:` バグ修正
- `docs:` ドキュメントのみの変更
- `style:` コードの動作に影響しない変更（フォーマット等）
- `refactor:` リファクタリング
- `test:` テストの追加・修正
- `chore:` ビルドプロセスやツールの変更

## 開発環境のセットアップ

1. リポジトリのクローン
```bash
git clone [repository-url]
cd 3d-viewer-web
```

2. バックエンドの依存関係をインストール
```bash
cd backend
pip install -r requirements.txt
```

3. フロントエンドの依存関係をインストール
```bash
cd frontend
npm install
```

4. テストの実行
```bash
# バックエンドのテスト
cd backend
python -m pytest

# フロントエンドのテスト
cd frontend
npm test
```

## ヘルプが必要な場合

質問や支援が必要な場合は、GitHubのイシューを作成してください。
