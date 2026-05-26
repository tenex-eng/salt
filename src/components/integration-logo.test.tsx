import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { IntegrationLogo } from './integration-logo';

describe('IntegrationLogo', () => {
  it('renders initials using a stable key rather than a catalog identifier', () => {
    render(<IntegrationLogo stableKey="vendor-crowdstrike" name="CrowdStrike" />);

    expect(screen.getByText('CR')).toBeInTheDocument();
  });

  it('falls back to the display name when the stable key is blank', () => {
    render(<IntegrationLogo stableKey="" name="ExtraHop" />);

    expect(screen.getByText('EX')).toBeInTheDocument();
  });
});
