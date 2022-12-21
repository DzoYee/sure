import NavBar from './NavBar';
import { renderWithProviders } from '../../utils/test';

describe('NavBar', () => {
  const defaultProps = {
    links: [
      { text: 'Link1', href: '/link1' },
      { text: 'Link2', href: '/link2' },
      { text: 'Link3', href: '/link3' },
    ],
  };

  it('should render NavBar links', () => {
    const { getByText } = renderWithProviders(<NavBar {...defaultProps} />);

    expect(getByText('Link1')).toBeInTheDocument();
    expect(getByText('Link2')).toBeInTheDocument();
    expect(getByText('Link3')).toBeInTheDocument();
  });

  // TODO: Challenge 2
  it('should render an `href` attribute for each link', () => {
    const { getByRole } = renderWithProviders(<NavBar {...defaultProps} />);

    expect(getByRole('link', {name: 'Link1'})).toHaveAttribute('href', '/link1');
    expect(getByRole('link', {name: 'Link2'})).toHaveAttribute('href', '/link2');
    expect(getByRole('link', {name: 'Link3'})).toHaveAttribute('href', '/link3');
  });
});
