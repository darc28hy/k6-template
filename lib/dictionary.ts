export const builtinMetricsDescriptions: { [key: string]: string } = {
  vus_max: '最大仮想ユーザー数',
  http_req_duration:
    'リクエストの合計時間<br/>（http_req_waiting + http_req_sending + http_req_receiving）',
  http_req_waiting:
    'リクエストを送信してからレスポンスが開始されるまでの時間<br/>（リモートホストからの応答を待つために費やされた時間、TTFB）',
  http_req_connecting: 'TCP接続の確立に費やされた時間',
  http_req_tls_handshaking:
    'リモートホストとのTLSセッションのハンドシェイクに費やされた時間',
  http_req_sending: 'リモートホストへのデータ送信に費やされた時間',
  http_req_receiving:
    'リモートホストからの応答データの受信に費やされた時間<br/>（レスポンスの1バイト目が到達してから最後のバイトを受信するまでの時間）',
  http_req_blocked: 'TCP接続の順番待ちをした時間',
  iteration_duration: 'シナリオ1ループにかかった時間',
}
