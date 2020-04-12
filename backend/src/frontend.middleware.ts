import { NestMiddleware } from '@nestjs/common';
import * as path from 'path';

const allowedExt = ['.js', '.ico', '.css', '.png', '.jpg', '.woff2', '.woff', '.ttf', '.svg'];

const resolvePath = (file: string) => path.resolve(`./public/${file}`);
const apiRoutePrefix = 'api';

export class FrontendMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log("dirname: " + __dirname);
    const { baseUrl } = req;

    if (baseUrl.indexOf(apiRoutePrefix) === 1) {
      next();
    } else if (allowedExt.filter(ext => baseUrl.indexOf(ext) > 0).length > 0) {
      res.sendFile(resolvePath(baseUrl));
    } else {
      res.sendFile(resolvePath('index.html'));
    }
  }
}
