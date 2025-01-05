// 获取反馈列表并展示
function getFeedbackList() {
  const feedbackItemsDiv = document.getElementById('feedback-items');
  feedbackItemsDiv.innerHTML = '';

  fetch('/get-feedback-list')
    .then(response => response.json())
    .then(data => {
          data.forEach(feedback => {
              const feedbackItemDiv = document.createElement('div');
              feedbackItemDiv.classList.add('feedback-item');
              feedbackItemDiv.innerHTML = `
                  <p><strong>姓名：</strong>${feedback.name || '未填写'}</p>
                  <p><strong>反馈内容：</strong>${feedback.feedback_text}</p>
                  <p><strong>是否修复：</strong><span class="fixed-status">${feedback.is_fixed? '已修复' : '未修复'}</span></p>
              `;
              feedbackItemDiv.appendChild(feedbackItemDiv);
          });
      })
    .catch(error => console.error('获取反馈列表出错：', error));
}

// 页面加载时获取反馈列表并展示
window.onload = function () {
  getFeedbackList();
}

// 假设添加一个按钮用于更新修复状态
function updateFixStatus(feedback_id) {
  fetch(`/update-fix-status/${feedback_id}`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `is_fixed=true`
  })
    .then(response => response.text())
    .then(result => {
          if (result === '修复状态更新成功！'){
              getFeedbackList();
          }else {
              console.error(result);
          }
      })
    .catch(error => console.error('更新修复状态出错：', error));
}