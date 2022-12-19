import InstructionsBar from './InstructionsBar';
import { renderWithProviders } from '../../utils/test';
import userEvent from "@testing-library/user-event";

describe('InstructionsBar', () => {
  const defaultProps = {
    onClick: jest.fn(),
  };

  it('should render a "View challenges" button', () => {
    const { getByText } = renderWithProviders(<InstructionsBar {...defaultProps} />);
    expect(getByText('View challenges')).toBeInTheDocument();
  });

  // TODO: Challenge 3
  it('should call the onClick prop when the button is clicked', () => {
    const { getByText } = renderWithProviders(<InstructionsBar {...defaultProps} />);
    userEvent.click(getByText('View challenges'))
    expect(defaultProps.onClick).toHaveBeenCalled()
  });
});
