import { MessageBox } from 'element-ui';

/**
 * @author chenRuiYao
 * 封装elementUI中的MessageBox，方便使用以下两点功能
 * 1、消息框只在处理完自定义事件后才关闭
 * 2、默认给确认按钮加上loading状态
 * 不需要这两个功能的无需用此组件
 *
 * @param message 显示的消息
 * @param type 消息框图标类型
 * @param options 支持所有Element MessageBox的Options
 * @param confirmCallback 确认按钮回调事件
 * @param cancelCallback 取消按钮回调事件
 * @param closeCallback 关闭按钮回调事件
 * @returns {Promise<MessageBoxData>} Promise
 *
 * eg:
 * this.$vmessagebox.msgBox('是否继续?', 'warning', {title:'我的标题'}, confirmCallback, undefined, undefined).catch(() => {});
 * 例子中的.catch(() => {})必须要有，否则取消或关闭时控制台会报错，这是ElementUI的问题
 */
export function msgBox (message, type, options, confirmCallback = () => {}, cancelCallback = () => {}, closeCallback = () => {}) {
  const msg = Object.assign({
    title: '提示',
    message,
    type,
    showCancelButton: true,
    beforeClose: async (action, instance, done) => {
      if (action === 'confirm') {
        instance.confirmButtonLoading = true;
        instance.confirmButtonText = '执行中...';
        await confirmCallback();
        instance.confirmButtonLoading = false;
        console.log(4444);
        done();
      } else if (action === 'cancel') {
        // 取消按钮事件
        await cancelCallback();
        done();
      } else {
        // 右上角关闭事件
        await closeCallback();
        done();
      }
    }
  }, options);
  return MessageBox(msg);
}

const VMessageBox = {
  msgBox
};

export default VMessageBox;
