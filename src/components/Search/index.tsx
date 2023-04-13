import { useState, useRef, useCallback } from 'react';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';

import { setSearchValue } from '../../redux/slices/filter/filterSlice';

import styles from './Search.module.scss';

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickClear = (event: React.MouseEvent<SVGSVGElement>) => {
    console.log(event);
    setValue('');
    dispatch(setSearchValue(''));
    inputRef.current?.focus();
  };

  const updateSearchValue = useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 250),
    []
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      {value ? (
        <svg
          className={styles.icon}
          onClick={onClickClear}
          height='48'
          viewBox='0 0 48 48'
          width='48'
          xmlns='http://www.w3.org/2000/svg'>
          <path d='M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z' />
          <path d='M0 0h48v48h-48z' fill='none' />
        </svg>
      ) : (
        <svg className={styles.icon} viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'>
          <title />
          <g id='search'>
            <path d='M29.71,28.29l-6.5-6.5-.07,0a12,12,0,1,0-1.39,1.39s0,.05,0,.07l6.5,6.5a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,28.29ZM14,24A10,10,0,1,1,24,14,10,10,0,0,1,14,24Z' />
          </g>
        </svg>
      )}
      <input
        ref={inputRef}
        onChange={(e) => onChangeInput(e)}
        value={value}
        type='text'
        placeholder='Шукати бургери...'
      />
    </div>
  );
};

export default Search;
