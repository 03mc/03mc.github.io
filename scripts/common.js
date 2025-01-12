// 获取按钮和导航菜单元素
const toggleButton = document.querySelector('nav.primary button');
const navMenu = document.querySelector('nav.primary ul');

// 为按钮添加点击事件监听器
toggleButton.addEventListener('click', function () {
  // 切换导航菜单的显示状态
  if (navMenu.style.display === 'none' || navMenu.style.display === '') {
    navMenu.style.display = 'block';
  } else {
    navMenu.style.display = 'none';
  }
});