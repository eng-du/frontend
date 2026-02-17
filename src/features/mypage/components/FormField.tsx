import Button from '@/components/Button/Button';
import { cn } from '@/utils/cn';
import { useEffect, useRef, useState, type FunctionComponent, type SVGProps } from 'react';

interface FormFieldProps {
  label: string;
  value: string;
  type: string;
  Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  disabled?: boolean;
  onChangeHandler?: () => void;
}

function FormField({ label, value, type, Icon, disabled = true, onChangeHandler }: FormFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const showEditButton = !disabled && !isEditing;
  const showEditingButtons = isEditing && onChangeHandler;

  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold">{label}</label>

      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Icon className="absolute top-1/2 left-5 h-5 w-5 -translate-y-1/2 text-text-secondary" />
          <input
            ref={inputRef}
            className={cn(
              'h-13 w-full rounded-lg border border-border-default bg-surface-weak pr-5 pl-15',
              !isEditing && 'text-text-secondary',
            )}
            type={type}
            value={inputValue}
            disabled={!isEditing}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          {showEditButton && (
            <Button
              variant="primary"
              appearance="ghost"
              className="h-13 flex-1 rounded-lg sm:w-20 sm:flex-none"
              onClickHandler={() => setIsEditing(true)}
            >
              수정
            </Button>
          )}

          {showEditingButtons && (
            <>
              <Button
                variant="primary"
                appearance="fill"
                className="h-13 flex-1 rounded-lg sm:w-20 sm:flex-none"
                onClickHandler={() => {
                  onChangeHandler();
                  setIsEditing(false);
                }}
              >
                저장
              </Button>

              <Button
                variant="primary"
                appearance="ghost"
                className="h-13 flex-1 rounded-lg sm:w-20 sm:flex-none"
                onClickHandler={() => {
                  setInputValue(value);
                  setIsEditing(false);
                }}
              >
                취소
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default FormField;
