from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] ='sqlite:///feedback.db'
db = SQLAlchemy(app)


class Feedback(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    feedback_text = db.Column(db.Text)
    is_fixed = db.Column(db.Boolean, default=False)

from flask import request


@app.route('/submit-feedback', method=['POST'])
def submit_feedback():
    name = request.form.get('name')
    feedback_text = request.form.get('feedback')

    new_feedback = Feedback(
        name=name if name else None,
        feedback_text=feedback_text
    )
    db.session.add(new_feedback)
    db.session.commit()
    return '反馈提交成功！'

@app.route('/update-fix-status/<int:feedback_id>', method=['POST'])
def update_fix_status(feedback_id):
    feedback = Feedback.query.get(feedback_id)
    if feedback:
        feedback.is_fixed = True if request.form.get('is_fixed') == 'true' else False
        db.session.commit()
        return '修复状态更新成功！'
    return '未找到对应的反馈信息！'

@app.route('/get-feedback-list', method=['GET'])
def get_feedback_list() :
    feedbacks = Feedback.query.all()
    feedback_list = [
        {
            'id': f.id,
            'name': f.name,
            'feedback_text': f.feedback_text,
            'is_fixed': f.is_fixed
        }
        for f in feedbacks
    ]
    return jsonify(feedback_list)