import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const useStore = () => {
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  return { state, dispatch };
};

export default useStore;
