/*
 * @Author: MaFengyan
 * @Date: 2020-02-25 09:37:39
 * @LastEditors: MaFengyan
 * @LastEditTime: 2020-02-25 13:28:08
 * @Description: 
*/
module.exports = {
  outputDir: __dirname + '/../server/web',
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/'
}