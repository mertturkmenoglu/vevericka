import { Children, useCallback, useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/outline';
import AuthStepperStep, { AuthStepperStepProps } from './AuthStepperStep';
import { useTranslation } from 'next-i18next';

export interface AuthStepperProps {}

type Component = React.FC<AuthStepperProps> & {
  Step: React.FC<AuthStepperStepProps>;
};

const AuthStepper: Component = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [safeRenderFlag, setSafeRenderFlag] = useState(false);
  const childrenArray = Children.toArray(children);

  const { t } = useTranslation('auth-stepper');

  /**
   * Check children
   * @returns true if index boundaries are safe
   * @returns false if index is not safe to use
   */
  const checkChildrenArrayIndexBound = useCallback(() => {
    return childrenArray.length !== 0;
  }, [childrenArray]);

  useEffect(() => {
    setSafeRenderFlag(checkChildrenArrayIndexBound());
  }, [childrenArray, checkChildrenArrayIndexBound, setSafeRenderFlag]);

  const isFirstStep = useMemo(() => {
    return currentIndex === 0;
  }, [currentIndex]);

  const isLastStep = useMemo(() => {
    return currentIndex === childrenArray.length - 1;
  }, [currentIndex, childrenArray]);

  if (!safeRenderFlag) {
    return <></>;
  }

  return (
    <div className="flex w-full flex-col">
      {childrenArray[currentIndex]}

      {/* Navigation buttons */}
      <div className="mt-8 flex w-full justify-between">
        <button
          onClick={() => setCurrentIndex((prev) => prev - 1)}
          className={clsx('flex items-center', { 'opacity-0': isFirstStep })}
          disabled={isFirstStep}
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <span className="ml-2">{t('previous')}</span>
        </button>

        <button
          onClick={() => setCurrentIndex((prev) => prev + 1)}
          className={clsx('flex items-center', { 'opacity-0': isLastStep })}
          disabled={isLastStep}
        >
          <span>{t('next')}</span>
          <ArrowRightIcon className="ml-2 h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

AuthStepper.Step = AuthStepperStep;

export default AuthStepper;
