import styled from 'styled-components';
import { spacing } from '../../styles/settings/spacing';

const CommentBody = styled.div`
  margin-top: 6px;
  
  // Comment text from API is HTML, and a weird one.
  // This tweaks the spacing to ensure consistency.
  & > *:last-child {
    margin-bottom: 0;
  }
  
  p, blockquote, pre {
    margin-top: ${spacing(3)};
    margin-bottom: 0;
  }
  
  // blockquote:not(:first-child) {
  //   margin-top: ${spacing(6)};
  // }
`;

export default CommentBody;