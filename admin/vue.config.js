/*
 * @Author: MaFengyan
 * @Date: 2020-02-25 09:37:39
 * @LastEditors: MaFengyan
 * @LastEditTime: 2020-02-25 09:45:01
 * @Description: 
*/
module.exports = {
  outputDir: __dirname + '/../server/admin',
  publicPath: process.env.NODE_ENV === 'production'
    ? '/admin/'
    : '/'
}