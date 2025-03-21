import asyncio
import websockets
import numpy as np
import time

class PointCloudServer:
    def __init__(self):
        # フレームレート設定
        self.target_fps = 30
        self.frame_time = 1.0 / self.target_fps
        
    def generate_sample_point_cloud(self):
        """サンプルのポイントクラウドデータを生成（デモ用）"""
        # 時間に基づいて動く球体の表面上の点を生成
        t = time.time()
        n_points = 1000
        
        # 球面座標のパラメータ
        phi = np.random.uniform(0, 2*np.pi, n_points)
        theta = np.random.uniform(0, np.pi, n_points)
        r = 2.0 + 0.2 * np.sin(t * 2)  # 半径を時間とともに変化させる
        
        # 球面座標からデカルト座標に変換
        x = r * np.sin(theta) * np.cos(phi)
        y = r * np.sin(theta) * np.sin(phi)
        z = r * np.cos(theta)
        
        # 座標を結合してnumpy配列を作成 (n_points × 3の形状)
        points = np.column_stack((x, y, z))
        
        # アニメーション効果: 全体を回転
        rotation_matrix = np.array([
            [np.cos(t), -np.sin(t), 0],
            [np.sin(t), np.cos(t), 0],
            [0, 0, 1]
        ])
        
        points = points @ rotation_matrix
        
        return points.astype(np.float32)

    async def send_point_cloud(self, websocket):
        """ポイントクラウドデータを生成して送信"""
        while True:
            start_time = time.time()
            
            # ポイントクラウドデータを生成
            points = self.generate_sample_point_cloud()
            
            # numpy配列をバイナリデータに変換
            binary_data = points.tobytes()
            
            # データを送信
            await websocket.send(binary_data)
            
            # フレームレート制御
            elapsed = time.time() - start_time
            sleep_time = max(0, self.frame_time - elapsed)
            await asyncio.sleep(sleep_time)

    async def handler(self, websocket, path):
        """WebSocket接続のハンドラ"""
        print("クライアント接続確立")
        try:
            await self.send_point_cloud(websocket)
        except websockets.exceptions.ConnectionClosed:
            print("クライアント接続終了")
        except Exception as e:
            print(f"エラー発生: {e}")

async def main():
    server = PointCloudServer()
    async with websockets.serve(server.handler, "localhost", 8765):
        print("WebSocketサーバー起動: ws://localhost:8765")
        await asyncio.Future()  # サーバーを無期限に実行

if __name__ == "__main__":
    asyncio.run(main())
