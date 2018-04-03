import styled from 'styled-components';
import { colors } from '../../styles/settings/colors';
import { spacing } from '../../styles/settings/spacing';

const CommentsEmptyState = styled.h2`
  text-align: center;
  margin-top: ${spacing(20)};
  padding-top: ${spacing(10)};
  border-top: 1px solid ${colors.neutral['80']};
`;

export default CommentsEmptyState;