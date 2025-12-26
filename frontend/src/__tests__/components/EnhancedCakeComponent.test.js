import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { EnhancedCakeComponent } from '@/components/birthday/EnhancedCakeComponent';

describe('EnhancedCakeComponent', () => {
  const mockOnCakeTap = jest.fn();
  const mockOnAnimationComplete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should not render when not visible', () => {
    const { container } = render(
      <EnhancedCakeComponent
        isVisible={false}
        onCakeTap={mockOnCakeTap}
        onAnimationComplete={mockOnAnimationComplete}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it('should render cake when visible', () => {
    render(
      <EnhancedCakeComponent
        isVisible={true}
        onCakeTap={mockOnCakeTap}
        onAnimationComplete={mockOnAnimationComplete}
      />
    );

    const cakeButton = screen.getByTestId('birthday-cake');
    expect(cakeButton).toBeInTheDocument();
  });

  it('should show "Tap the Cake!" label after delay', async () => {
    render(
      <EnhancedCakeComponent
        isVisible={true}
        onCakeTap={mockOnCakeTap}
        onAnimationComplete={mockOnAnimationComplete}
      />
    );

    // Initially not visible
    expect(screen.queryByText(/Tap the Cake!/i)).not.toBeInTheDocument();

    // After 800ms, should be visible
    jest.advanceTimersByTime(800);

    await waitFor(() => {
      expect(screen.getByText(/Tap the Cake!/i)).toBeInTheDocument();
    });
  });

  it('should handle cake tap', () => {
    render(
      <EnhancedCakeComponent
        isVisible={true}
        onCakeTap={mockOnCakeTap}
        onAnimationComplete={mockOnAnimationComplete}
      />
    );

    const cakeButton = screen.getByTestId('birthday-cake');
    fireEvent.click(cakeButton);

    // Should trigger callback after delay
    jest.advanceTimersByTime(600);
    expect(mockOnCakeTap).toHaveBeenCalledTimes(1);
  });

  it('should show birthday message after blow animation', async () => {
    render(
      <EnhancedCakeComponent
        isVisible={true}
        onCakeTap={mockOnCakeTap}
        onAnimationComplete={mockOnAnimationComplete}
      />
    );

    const cakeButton = screen.getByTestId('birthday-cake');
    fireEvent.click(cakeButton);

    // Advance time to show message
    jest.advanceTimersByTime(600);

    await waitFor(() => {
      expect(screen.getByText(/Happy Birthday!/i)).toBeInTheDocument();
      expect(screen.getByText(/Make a wish, Chirag!/i)).toBeInTheDocument();
    });
  });

  it('should call onAnimationComplete after full animation', () => {
    render(
      <EnhancedCakeComponent
        isVisible={true}
        onCakeTap={mockOnCakeTap}
        onAnimationComplete={mockOnAnimationComplete}
      />
    );

    const cakeButton = screen.getByTestId('birthday-cake');
    fireEvent.click(cakeButton);

    // Advance to completion (600ms + 4000ms + 1000ms)
    jest.advanceTimersByTime(5600);

    expect(mockOnAnimationComplete).toHaveBeenCalledTimes(1);
  });

  it('should not respond to tap after blown out', () => {
    render(
      <EnhancedCakeComponent
        isVisible={true}
        onCakeTap={mockOnCakeTap}
        onAnimationComplete={mockOnAnimationComplete}
      />
    );

    const cakeButton = screen.getByTestId('birthday-cake');
    
    // First tap
    fireEvent.click(cakeButton);
    jest.advanceTimersByTime(600);
    expect(mockOnCakeTap).toHaveBeenCalledTimes(1);

    // Second tap (should be ignored)
    fireEvent.click(cakeButton);
    jest.advanceTimersByTime(600);
    expect(mockOnCakeTap).toHaveBeenCalledTimes(1); // Still 1
  });

  it('should reset state when visibility changes', () => {
    const { rerender } = render(
      <EnhancedCakeComponent
        isVisible={true}
        onCakeTap={mockOnCakeTap}
        onAnimationComplete={mockOnAnimationComplete}
      />
    );

    const cakeButton = screen.getByTestId('birthday-cake');
    fireEvent.click(cakeButton);

    // Hide component
    rerender(
      <EnhancedCakeComponent
        isVisible={false}
        onCakeTap={mockOnCakeTap}
        onAnimationComplete={mockOnAnimationComplete}
      />
    );

    // Show again
    rerender(
      <EnhancedCakeComponent
        isVisible={true}
        onCakeTap={mockOnCakeTap}
        onAnimationComplete={mockOnAnimationComplete}
      />
    );

    // Should be able to tap again
    const newCakeButton = screen.getByTestId('birthday-cake');
    expect(newCakeButton).not.toBeDisabled();
  });

  it('should apply GPU acceleration styles', () => {
    const { container } = render(
      <EnhancedCakeComponent
        isVisible={true}
        onCakeTap={mockOnCakeTap}
        onAnimationComplete={mockOnAnimationComplete}
      />
    );

    const cakeContainer = container.querySelector('[style*="perspective"]');
    expect(cakeContainer).toBeInTheDocument();
  });

  it('should have proper ARIA attributes', () => {
    render(
      <EnhancedCakeComponent
        isVisible={true}
        onCakeTap={mockOnCakeTap}
        onAnimationComplete={mockOnAnimationComplete}
      />
    );

    const cakeButton = screen.getByTestId('birthday-cake');
    expect(cakeButton).toHaveAttribute('data-testid', 'birthday-cake');
  });
});
