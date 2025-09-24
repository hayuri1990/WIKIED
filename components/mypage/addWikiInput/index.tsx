import Button from '@/components/common/button';
import Input from '@/components/common/input';
import styles from '@/components/mypage/addWikiInput/styles.module.scss';
import { AddWikiInputProps } from '@/components/mypage/addWikiInput/types';
import { useState } from 'react';
import Toast from '@/components/common/toast';

const AddWikiInput = ({ onAddWiki }: AddWikiInputProps) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const success = await onAddWiki({
        securityAnswer: answer,
        securityQuestion: question,
      });
      if (success) {
        setToastMessage('위키 생성에 성공했어요 😃');
        setToastType('success');
        setQuestion('');
        setAnswer('');
      }
    } catch (error) {
      setToastMessage('이미 위키가 존재해요 🙁');
      setToastType('error');
    }
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <form className={styles['container']} onSubmit={handleSubmit}>
      <label htmlFor="wiki" className={styles['label']}>
        위키 생성하기
      </label>
      <div className={styles['wiki-input-wrapper']}>
        <Input
          id="wiki-question"
          name="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          type="text"
          placeholder="질문을 입력해 주세요"
          fullWidth
        />
        <Input
          id="wiki-answer"
          name="answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          type="text"
          placeholder="답을 입력해 주세요"
          fullWidth
        />
      </div>
      <Button color="primary" size="small" alignEnd defaultPadding>
        생성하기
      </Button>

      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
    </form>
  );
};

export default AddWikiInput;
