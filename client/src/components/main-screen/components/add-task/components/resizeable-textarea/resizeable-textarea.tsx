import { TextareaHTMLAttributes, useLayoutEffect, useRef } from 'react';
import styles from './styles.module.scss';

interface ResizableTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const ResizeableTextarea = (props: ResizableTextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useLayoutEffect(() => {
    if (!textareaRef.current) return;

    textareaRef.current.style.height = 'inherit';
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }, [props.value]);

  return <textarea className={styles.textarea} ref={textareaRef} rows={1} {...props} />;
};

export default ResizeableTextarea;
