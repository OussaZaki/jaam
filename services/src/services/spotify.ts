import { Response, Request } from "express";
import request from "request";

const _getExpirationTime = (timeInSeconds: string) => {
  return new Date().getTime() + (parseInt(timeInSeconds, 10) * 1000);
}

export const auth = (req: Request, res: Response) => {
  const code = req.body.code || null;
  const redirectUrl = req.body.redirectUrl || null;

  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: redirectUrl,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))
    },
    json: true
  };


  request.post(authOptions, (error: any, response: any, body: any) => {
    if (!error && response.statusCode === 200) {
      const accessToken = body.access_token,
        refreshToken = body.refresh_token,
        tokenExpirationTime = _getExpirationTime(body.expires_in);

      res.json({
        accessToken,
        refreshToken,
        tokenExpirationTime
      });
    } else {
      res.status(403).send({
        message: "Authorization failed!"
      });
    }
  });
};

export const refreshToken = (req: Request, res: Response) => {
  var refresh_token = req.body.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, (error: any, response: any, body: any) => {
    if (!error && response.statusCode === 200) {
      const accessToken = body.access_token,
        tokenExpirationTime = _getExpirationTime(body.expires_in);

      res.json({
        accessToken,
        tokenExpirationTime
      });
    } else {
      res.status(403).send({
        message: "Refreshing failed!"
      });
    }
  });
};
