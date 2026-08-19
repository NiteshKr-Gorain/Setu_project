import { createElement, useEffect, useMemo, useState } from 'react';
import './TextType.css';

/** A lightweight React Bits-compatible typing effect without an external runtime dependency. */
export default function TextType({
  text,
  as: Component = 'span',
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  className = '',
  showCursor = true,
  cursorCharacter = '|',
  cursorClassName = '',
  ...props
}) {
  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);
  const [displayedText, setDisplayedText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasStarted, setHasStarted] = useState(initialDelay === 0);

  useEffect(() => {
    if (initialDelay === 0) return undefined;
    const timeout = setTimeout(() => setHasStarted(true), initialDelay);
    return () => clearTimeout(timeout);
  }, [initialDelay]);

  useEffect(() => {
    if (!hasStarted) return undefined;
    const currentText = textArray[textIndex] || '';
    let timeout;

    if (!isDeleting && displayedText.length < currentText.length) {
      timeout = setTimeout(() => setDisplayedText(currentText.slice(0, displayedText.length + 1)), typingSpeed);
    } else if (!isDeleting) {
      if (!loop && textIndex === textArray.length - 1) return undefined;
      timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
    } else if (displayedText) {
      timeout = setTimeout(() => setDisplayedText(previous => previous.slice(0, -1)), deletingSpeed);
    } else {
      setIsDeleting(false);
      setTextIndex(previous => (previous + 1) % textArray.length);
    }

    return () => clearTimeout(timeout);
  }, [deletingSpeed, displayedText, hasStarted, isDeleting, loop, pauseDuration, textArray, textIndex, typingSpeed]);

  return createElement(
    Component,
    { className: `text-type ${className}`, ...props },
    <span className="text-type__content">{displayedText}</span>,
    showCursor && <span className={`text-type__cursor ${cursorClassName}`}>{cursorCharacter}</span>
  );
}
