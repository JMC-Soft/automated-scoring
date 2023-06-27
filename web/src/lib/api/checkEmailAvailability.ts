import { API_BASE_URL } from '@/lib/api/const';

type ValidationResult =
  | { result: 'success' }
  | { result: 'error'; status: { errCode: number; msg: string } };

const checkEmailAvailability = async (
  email: string,
): Promise<ValidationResult> => {
  const response = await fetch(`${API_BASE_URL}/register?email=${email}`);

  const validationRes: ValidationResult = await response.json();

  return validationRes;
};
export default checkEmailAvailability;
