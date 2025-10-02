import React, { useEffect, useRef, useState } from 'react';
import heroVideo from './assets/luxury-salon.mp4';
import styled, { createGlobalStyle, keyframes } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'os_regular';
    src: url('https://fonts.gstatic.com/s/opensans/v35/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0B4gaVc.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  
  :root{
    --bg: #FAFAFA;
    --text: #1D1D1F;
    --text-secondary: rgba(84,84,84,1.00);
    --text-tertiary: #A1A1A6;
    --border: rgba(0,0,0,0.08);
    --border-light: rgba(0,0,0,0.04);
    --glass: rgba(255,255,255,0.8);
    --glass-border: rgba(255,255,255,0.18);
    --shadow-sm: 0 2px 16px rgba(0,0,0,0.04);
    --shadow-md: 0 8px 32px rgba(0,0,0,0.06);
    --shadow-lg: 0 20px 64px rgba(0,0,0,0.08);
    --purple: #007AFF;
    --purple-hover: #0056CC;
    --radius-sm: 8px;
    --radius-md: 12px;
    --radius-lg: 16px;
    --radius-xl: 20px;
    
    /* Mobile-first breakpoints */
    --mobile-sm: 375px;
    --mobile-md: 414px;
    --tablet: 768px;
    --desktop: 1024px;
    --desktop-lg: 1200px;
  }
  
  *{ 
    box-sizing: border-box; 
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: transparent;
    tap-highlight-color: transparent;
  }
  
  html { 
    height: 100%; 
    /* Prevent zoom on iOS */
    -webkit-text-size-adjust: 100%;
    text-size-adjust: 100%;
  }
  
  body, #root { 
    height: 100%; 
    /* Prevent horizontal scroll on mobile */
    overflow-x: hidden;
  }
  
  body{
    margin: 0;
    font-family: 'os_regular', -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
    color: var(--text);
    background: var(--bg);
    line-height: 1.6;
    font-weight: 400;
    /* Better touch scrolling on iOS */
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch;
  }
  
  h1, h2, h3, h4, h5, h6 { 
    font-weight: 700; 
    letter-spacing: -0.02em; 
    line-height: 1.1;
    margin: 0;
  }
  
  p { 
    color: var(--text-secondary); 
    margin: 0;
    font-weight: 400;
  }
  
  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    outline: none;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    /* Better touch targets on mobile */
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  
  input {
    font-family: inherit;
    outline: none;
    /* Prevent zoom on iOS */
    font-size: 16px;
    @media (max-width: 768px) {
      font-size: 16px; /* Minimum to prevent iOS zoom */
    }
  }
  
  /* Smooth scrolling for better UX */
  html {
    scroll-behavior: smooth;
  }
  
  /* Hide scrollbar but keep functionality */
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
  
  /* Mobile performance optimizations */
  @media (max-width: 768px) {
    /* Optimize animations for mobile */
    * {
      animation-duration: 0.8s !important;
      transition-duration: 0.2s !important;
    }
    
    /* Reduce motion for users who prefer it */
    @media (prefers-reduced-motion: reduce) {
      * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
  }
  
  /* Touch device optimizations */
  @media (hover: none) and (pointer: coarse) {
    /* Remove hover effects on touch devices */
    *:hover {
      transform: none !important;
    }
    
    /* Ensure touch targets are large enough */
    button, a, input[type="button"], input[type="submit"] {
      min-height: 44px;
      min-width: 44px;
    }
  }
`;

const codScroll = keyframes`
  0% { 
    transform: translateX(0) translateY(-50%); 
    opacity: 1; 
  }
  70% { 
    transform: translateX(-630px) translateY(-50%); 
    opacity: 1; 
  }
  100% { 
    transform: translateX(-630px) translateY(-50%); 
    opacity: 0; 
  }
`;

const scrollLoop = keyframes`
  0%, 15% { 
    transform: translateX(0) translateY(-50%); 
    opacity: 1; 
  }
  10.5%, 12.5% { 
    transform: translateX(-630px) translateY(-50%); 
    opacity: 1; 
  }
  15%, 100% { 
    transform: translateX(-630px) translateY(-50%); 
    opacity: 0; 
  }
  
  /* Mobile optimized keyframes */
  @media (max-width: 768px) {
    10.5%, 12.5% { 
      transform: translateX(-400px) translateY(-50%); 
      opacity: 1; 
    }
    15%, 100% { 
      transform: translateX(-400px) translateY(-50%); 
      opacity: 0; 
    }
  }
  
  @media (max-width: 480px) {
    10.5%, 12.5% { 
      transform: translateX(-280px) translateY(-50%); 
      opacity: 1; 
    }
    15%, 100% { 
      transform: translateX(-280px) translateY(-50%); 
      opacity: 0; 
    }
  }
`;

const fadeUp = keyframes`
  0% { opacity: 0; transform: translateY(18px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const cursorBlink = keyframes`
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
`;

const InfoBar = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 44px;
  display: flex;
  align-items: center;
  gap: 16px;
  background: var(--glass);
  color: var(--text-secondary);
  border-bottom: 1px solid var(--border-light);
  z-index: 1000;
  padding: 0 max(20px, env(safe-area-inset-left));
  font-size: 13px;
  font-weight: 500;
  letter-spacing: -0.01em;
  backdrop-filter: saturate(1.8) blur(20px);
  -webkit-backdrop-filter: saturate(1.8) blur(20px);
  
  /* Mobile optimizations */
  @media (max-width: 768px) {
    height: 40px;
    padding: 0 16px;
    font-size: 12px;
    gap: 12px;
    /* Ensure text doesn't wrap on small screens */
    white-space: nowrap;
    overflow: hidden;
  }
  
  @media (max-width: 480px) {
    height: 36px;
    padding: 0 12px;
    font-size: 11px;
    gap: 8px;
  }
`;

const InfoStatic = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  white-space: nowrap;
  font-weight: 500;
  color: #6B7280;
  
  /* Mobile responsive adjustments */
  @media (max-width: 768px) {
    gap: 8px;
    font-size: 11px;
    
    /* Hide customer care on very small screens */
    span:last-child {
      display: none;
    }
  }
  
  @media (max-width: 480px) {
    gap: 6px;
    font-size: 10px;
  }
  
  /* Show only hours on mobile, hide phone */
  @media (max-width: 600px) {
    span:nth-child(3) { /* Customer Care span */
      display: none;
    }
  }
`;

const InfoDot = styled.span`
  width: 4px; height: 4px; border-radius: 999px; background: #D1D5DB; display: inline-block;
  
  /* Hide dot on mobile when phone number is hidden */
  @media (max-width: 600px) {
    &:last-of-type {
      display: none;
    }
  }
`;

const InfoScrollWrap = styled.div`
  position: relative;
  overflow: hidden;
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ScrollingText = styled.div`
  position: absolute;
  right: 20px;
  top: 50%;
  color: #6B7280;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  text-align: center;
  opacity: 0;
  animation: ${scrollLoop} 20s ease-in-out infinite;
  
  &:nth-child(1) { animation-delay: 0s; }
  &:nth-child(2) { animation-delay: 4s; }
  &:nth-child(3) { animation-delay: 8s; }
  &:nth-child(4) { animation-delay: 12s; }
  &:nth-child(5) { animation-delay: 16s; }
  
  /* Mobile adjustments for scrolling text */
  @media (max-width: 768px) {
    right: 16px;
    font-size: 11px;
  }
  
  @media (max-width: 480px) {
    right: 12px;
    font-size: 10px;
  }
  
  /* Reduce animation complexity on mobile for better performance */
  @media (max-width: 480px) and (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0.7;
    position: static;
    transform: none;
  }
`;

const Header = styled.header`
  position: fixed;
  top: 44px; left: 0; right: 0;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--glass);
  border-bottom: 1px solid var(--border-light);
  box-shadow: var(--shadow-sm);
  padding: 0 max(24px, env(safe-area-inset-left));
  z-index: 1000;
  backdrop-filter: saturate(1.8) blur(20px);
  -webkit-backdrop-filter: saturate(1.8) blur(20px);
  
  /* Mobile responsive header */
  @media (max-width: 768px) {
    top: 40px; /* Adjusted for mobile info bar */
    height: 64px;
    padding: 0 16px;
  }
  
  @media (max-width: 480px) {
    top: 36px; /* Adjusted for smaller mobile info bar */
    height: 56px;
    padding: 0 12px;
  }
`;

const Brand = styled.div`
  display: flex; 
  align-items: center; 
  gap: 12px;
  font-weight: 700; 
  font-size: 20px;
  letter-spacing: -0.02em;
  color: var(--text);
  flex-shrink: 0; /* Prevent logo from shrinking on mobile */
  
  .logo{ 
    width: 140px; 
    height: 58px; 
    display: flex; 
    align-items: center; 
    justify-content: center;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1));
    }
    
    &:hover {
      transform: translateY(-1px) scale(1.02);
      
      img {
        filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15));
      }
    }
  }
  
  /* Mobile logo adjustments */
  @media (max-width: 768px) {
    gap: 8px;
    
    .logo {
      width: 120px;
      height: 50px;
    }
  }
  
  @media (max-width: 480px) {
    gap: 6px;
    
    .logo {
      width: 100px;
      height: 42px;
    }
  }
  
  @media (max-width: 375px) {
    .logo {
      width: 90px;
      height: 38px;
    }
  }
  
  span {
    background: linear-gradient(135deg, #1D1D1F 0%, #667eea 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const Nav = styled.nav`
  display: flex; 
  gap: 4px; 
  align-items: center;
  
  /* Hide navigation on tablet and mobile */
  @media (max-width: 920px) { 
    display: none; 
  }
`;

const NavBtn = styled.button`
  background: transparent;
  padding: 8px 16px; 
  border-radius: var(--radius-sm);
  font-family: 'Segoe UI', sans-serif;
  font-weight: 400; 
  font-size: 14px;
  line-height: 20px;
  color: var(--text-secondary);
  text-decoration: none;
  text-transform: none;
  text-align: center;
  
  &:hover{ 
    background: rgba(0,0,0,0.04); 
    color: var(--text-secondary);
  }
  
  &:active {
    background: rgba(0,0,0,0.08);
    transform: scale(0.98);
  }
`;

const SearchWrap = styled.div`
  position: relative;
  flex: 0 1 480px;
  display: flex; 
  align-items: center; 
  gap: 12px;
  border: none;
  border-radius: 20px; 
  padding: 10px 20px;
  background: rgb(255,255,255);
  box-shadow: var(--shadow-sm);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Hide on mobile and tablet - will be replaced with mobile search */
  @media (max-width: 920px){ 
    display: none; 
  }
  
  &:hover{ 
    box-shadow: var(--shadow-md);
  }
  
  &.focus{ 
    box-shadow: var(--shadow-lg);
  }
  
  input{
    flex: 1; 
    border: 0; 
    outline: none; 
    background: transparent;
    font-family: 'os_regular', sans-serif;
    font-size: 14px; 
    font-weight: 400;
    color: var(--text-secondary);
    
    &::placeholder {
      color: transparent;
    }
  }
`;

const TypewriterContainer = styled.div`
  position: absolute;
  left: 40px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: var(--text-tertiary);
  display: flex;
  align-items: center;
  line-height: 1;
`;

const StaticPrefix = styled.span`
  color: var(--text-tertiary);
  opacity: 0.8;
`;

const TypedText = styled.span`
  color: var(--text-tertiary);
  position: relative;
`;

/* Removed cursor component */

const SearchDropdown = styled.div`
  position: absolute; 
  top: calc(100% + 8px); 
  left: 0; 
  right: 0;
  background: rgba(255, 255, 255, 0.95); /* Enhanced opacity for better readability */
  border: 1px solid rgba(255, 255, 255, 0.3); 
  border-radius: var(--radius-lg);
  box-shadow: 0 20px 64px rgba(0, 0, 0, 0.15), 0 8px 32px rgba(0, 0, 0, 0.1); /* Enhanced shadow */
  backdrop-filter: saturate(1.8) blur(24px); /* Increased blur for better clarity */
  -webkit-backdrop-filter: saturate(1.8) blur(24px);
  padding: 24px; 
  z-index: 1100;
  
  /* Enhanced readability with subtle inner shadow */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
    border-radius: var(--radius-lg);
    pointer-events: none;
  }
  
  /* Mobile responsive adjustments */
  @media (max-width: 768px) {
    left: -16px;
    right: -16px;
    padding: 20px;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.97); /* Even more opaque on mobile */
    backdrop-filter: saturate(1.8) blur(20px);
    -webkit-backdrop-filter: saturate(1.8) blur(20px);
  }
  
  @media (max-width: 480px) {
    left: -20px;
    right: -20px;
    padding: 16px;
    border-radius: 12px;
  }
`;

const Trending = styled.div`
  display: grid; 
  gap: 16px;
  
  /* Mobile spacing adjustments */
  @media (max-width: 768px) {
    gap: 14px;
  }
  
  @media (max-width: 480px) {
    gap: 12px;
  }
`;

const TrendingTitle = styled.div`
  font-weight: 700; 
  font-size: 16px;
  color: var(--text);
  letter-spacing: -0.01em;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); /* Subtle text shadow for clarity */
  
  /* Mobile typography */
  @media (max-width: 768px) {
    font-size: 15px;
  }
  
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const Chips = styled.div`
  display: flex; 
  flex-wrap: wrap; 
  gap: 10px;
  
  /* Mobile spacing */
  @media (max-width: 768px) {
    gap: 8px;
  }
  
  @media (max-width: 480px) {
    gap: 6px;
  }
`;

const Chip = styled.button`
  appearance: none; 
  border: 1px solid rgba(0, 0, 0, 0.12); /* Enhanced border visibility */
  background: rgba(255, 255, 255, 0.9); /* More opaque background */
  color: var(--text-secondary); 
  font-weight: 600; 
  font-size: 13px;
  padding: 10px 16px; 
  border-radius: 999px; 
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04); /* Subtle shadow for depth */
  
  /* Minimum touch target for mobile */
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover { 
    background: rgba(255, 255, 255, 1);
    border-color: rgba(0, 0, 0, 0.18);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
  
  &:active {
    transform: translateY(0) scale(0.98);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  }
  
  /* Mobile optimizations */
  @media (max-width: 768px) {
    font-size: 12px;
    padding: 8px 14px;
    min-height: 36px;
  }
  
  @media (max-width: 480px) {
    font-size: 11px;
    padding: 6px 12px;
    min-height: 32px;
  }
  
  /* Touch device specific styles */
  @media (hover: none) and (pointer: coarse) {
    &:hover {
      transform: none;
    }
    
    &:active {
      background: rgba(0, 0, 0, 0.05);
      transform: scale(0.98);
    }
  }
`;

/* Removed right-side media preview */

const LoginBtn = styled.button`
  padding: 12px 28px; 
  border-radius: var(--radius-xl);
  background: linear-gradient(135deg, rgba(0, 122, 255, 0.15) 0%, rgba(88, 86, 214, 0.12) 100%);
  backdrop-filter: saturate(1.8) blur(20px);
  -webkit-backdrop-filter: saturate(1.8) blur(20px);
  border: 1px solid rgba(0, 122, 255, 0.25);
  color: #007AFF; 
  font-weight: 600;
  font-size: 15px;
  letter-spacing: -0.01em;
  box-shadow: 0 8px 32px rgba(0, 122, 255, 0.15);
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
  white-space: nowrap;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Premium glass effect overlay with blue tint */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0, 122, 255, 0.08) 0%, rgba(88, 86, 214, 0.05) 100%);
    border-radius: var(--radius-xl);
    pointer-events: none;
    transition: opacity 0.3s ease;
  }
  
  /* Premium shimmer effect */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    transition: left 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  &:hover{ 
    background: linear-gradient(135deg, rgba(0, 122, 255, 0.25) 0%, rgba(88, 86, 214, 0.18) 100%);
    border-color: rgba(0, 122, 255, 0.4);
    box-shadow: 0 12px 40px rgba(0, 122, 255, 0.25);
    transform: translateY(-2px);
    color: #0056CC;
    
    &::before {
      opacity: 1;
    }
    
    &::after {
      left: 100%;
    }
  }
  
  &:active{ 
    transform: translateY(0) scale(0.98);
    box-shadow: 0 6px 24px rgba(0, 122, 255, 0.2);
    background: linear-gradient(135deg, rgba(0, 122, 255, 0.2) 0%, rgba(88, 86, 214, 0.15) 100%);
  }
  
  /* Focus state for accessibility */
  &:focus-visible {
    outline: 2px solid rgba(0, 122, 255, 0.8);
    outline-offset: 2px;
  }
  
  /* Mobile adjustments */
  @media (max-width: 920px) {
    display: none; /* Hide on mobile - will be in mobile menu */
  }
  
  @media (max-width: 768px) {
    padding: 10px 24px;
    font-size: 14px;
  }
  
  @media (max-width: 480px) {
    padding: 8px 20px;
    font-size: 13px;
  }
  
  /* Touch device optimizations */
  @media (hover: none) and (pointer: coarse) {
    &:hover {
      transform: none;
    }
    
    &:active {
      background: linear-gradient(135deg, rgba(0, 122, 255, 0.3) 0%, rgba(88, 86, 214, 0.2) 100%);
      transform: scale(0.98);
    }
  }
`;

const MobileActions = styled.div`
  display: none; 
  align-items: center; 
  gap: 12px;
  
  /* Show mobile actions on tablet and mobile */
  @media (max-width: 920px) { 
    display: flex; 
  }
`;

const MobileSearchBtn = styled.button`
  appearance: none;
  border: 0;
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-sm);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    background: rgba(255,255,255,1);
    box-shadow: var(--shadow-md);
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0) scale(0.95);
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
  
  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    
    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

const Burger = styled.button`
  appearance: none; 
  border: 0; 
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  cursor: pointer;
  width: 40px; 
  height: 40px; 
  border-radius: 12px;
  display: inline-flex; 
  align-items: center; 
  justify-content: center;
  box-shadow: var(--shadow-sm);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover { 
    background: rgba(255,255,255,1);
    box-shadow: var(--shadow-md);
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0) scale(0.95);
  }
  
  span{
    width: 18px; 
    height: 2px; 
    background: var(--text); 
    position: relative; 
    display: block;
    border-radius: 1px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  span::before, span::after{
    content: ""; 
    position: absolute; 
    left: 0; 
    width: 18px; 
    height: 2px; 
    background: var(--text);
    border-radius: 1px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  span::before{ top: -6px; }
  span::after{ top: 6px; }
  
  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    
    span {
      width: 16px;
      
      &::before, &::after {
        width: 16px;
      }
    }
  }
`;

const MobileMenu = styled.div`
  position: fixed; 
  left: 16px; 
  right: 16px;
  background: var(--glass); 
  border: 1px solid var(--glass-border); 
  border-radius: 20px;
  box-shadow: var(--shadow-lg); 
  z-index: 1100;
  padding: 16px;
  display: none; 
  flex-direction: column; 
  gap: 8px;
  backdrop-filter: saturate(1.8) blur(20px);
  -webkit-backdrop-filter: saturate(1.8) blur(20px);
  
  /* Adjust position based on header height */
  top: 104px; /* info bar (40px) + header (64px) on mobile */
  
  @media (max-width: 480px) {
    top: 92px; /* info bar (36px) + header (56px) on small mobile */
    left: 12px;
    right: 12px;
    padding: 12px;
    border-radius: 16px;
  }
  
  &.open { 
    display: flex; 
    animation: slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  @keyframes slideDown {
    0% {
      opacity: 0;
      transform: translateY(-10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const MobileLink = styled.button`
  appearance: none; 
  border: 0; 
  background: transparent; 
  text-align: left;
  padding: 16px 12px; 
  border-radius: 12px; 
  font-weight: 600; 
  font-size: 16px;
  color: var(--text);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Minimum touch target size for accessibility */
  min-height: 44px;
  display: flex;
  align-items: center;
  
  &:hover { 
    background: rgba(0,0,0,0.04);
    transform: translateX(4px);
  }
  
  &:active {
    background: rgba(0,0,0,0.08);
    transform: translateX(2px) scale(0.98);
  }
  
  @media (max-width: 480px) {
    padding: 14px 10px;
    font-size: 15px;
    min-height: 40px;
  }
`;

const MobileSearchContainer = styled.div`
  padding: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  margin-bottom: 12px;
  
  @media (max-width: 480px) {
    padding: 12px;
    margin-bottom: 8px;
  }
`;

const MobileSearchInput = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.95); /* Enhanced opacity for better readability */
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 16px;
  padding: 14px 16px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:focus-within {
    background: rgba(255, 255, 255, 1);
    border-color: rgba(0, 0, 0, 0.18);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
  
  input {
    flex: 1;
    border: 0;
    outline: none;
    background: transparent;
    font-family: 'os_regular', sans-serif;
    font-size: 16px;
    font-weight: 400;
    color: var(--text-secondary);
    
    &::placeholder {
      color: var(--text-tertiary);
    }
  }
  
  svg {
    color: var(--text-tertiary);
    flex-shrink: 0;
    width: 18px;
    height: 18px;
  }
  
  @media (max-width: 480px) {
    padding: 12px 14px;
    border-radius: 14px;
    
    input {
      font-size: 15px;
    }
    
    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

const PageOffset = styled.div`
  height: calc(44px + 72px); /* info bar + header on desktop */
  
  /* Mobile responsive offsets */
  @media (max-width: 768px) {
    height: calc(40px + 64px); /* mobile info bar + mobile header */
  }
  
  @media (max-width: 480px) {
    height: calc(36px + 56px); /* small mobile info bar + header */
  }
`;

const Hero = styled.section`
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  overflow: hidden;
  
  /* Mobile height adjustments */
  @media (max-width: 768px) {
    /* Account for mobile browser UI chrome */
    height: 100svh; /* Use small viewport height if supported */
    min-height: calc(100vh - 120px); /* Fallback */
  }
  
  @media (max-width: 480px) {
    height: 100svh;
    min-height: calc(100vh - 100px);
  }
  
  /* Handle iOS Safari viewport issues */
  @supports (-webkit-touch-callout: none) {
    height: -webkit-fill-available;
    min-height: -webkit-fill-available;
  }
`;

const AudioToggleBtn = styled.button`
  position: absolute;
  bottom: 32px;
  right: 32px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 10;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  
  /* Premium hover effects */
  &:hover {
    background: rgba(255, 255, 255, 0.25);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
  }
  
  &:active {
    transform: translateY(0) scale(0.98);
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.25);
  }
  
  /* Icon styling */
  svg {
    width: 24px;
    height: 24px;
    color: white;
    transition: all 0.2s ease;
  }
  
  /* Muted state styling */
  &.muted {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
    
    svg {
      opacity: 0.7;
    }
    
    &:hover {
      background: rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.4);
      
      svg {
        opacity: 1;
      }
    }
  }
  
  /* Mobile responsive adjustments */
  @media (max-width: 768px) {
    bottom: 24px;
    right: 24px;
    width: 48px;
    height: 48px;
    
    svg {
      width: 20px;
      height: 20px;
    }
  }
  
  @media (max-width: 480px) {
    bottom: 20px;
    right: 20px;
    width: 44px;
    height: 44px;
    
    svg {
      width: 18px;
      height: 18px;
    }
  }
  
  /* Touch device optimizations */
  @media (hover: none) and (pointer: coarse) {
    &:hover {
      transform: none;
    }
    
    &:active {
      background: rgba(255, 255, 255, 0.3);
      transform: scale(0.95);
    }
  }
  
  /* Accessibility */
  &:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.8);
    outline-offset: 2px;
  }
`;

const VideoBg = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -2;
  
  /* Mobile video optimizations */
  @media (max-width: 768px) {
    /* Ensure video covers properly on mobile */
    object-position: center center;
  }
  
  /* Prevent video loading on very slow connections */
  @media (max-width: 480px) and (max-resolution: 1.5dppx) {
    /* On low-res mobile devices, consider showing a static image instead */
    /* This can be implemented with a data attribute or conditional rendering */
  }
`;

const Tint = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg, 
    rgba(0,0,0,0.4) 0%, 
    rgba(0,0,0,0.2) 50%, 
    rgba(0,0,0,0.3) 100%
  );
  z-index: -1;
`;

const HeroContent = styled.div`
  max-width: 900px;
  padding: 0 max(24px, env(safe-area-inset-left));
  z-index: 1;
  width: 100%;
  
  /* Mobile responsive padding */
  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0 20px;
  }
  
  @media (max-width: 480px) {
    padding: 0 16px;
  }
  
  @media (max-width: 375px) {
    padding: 0 12px;
  }
`;

const H1 = styled.h1`
  font-size: clamp(32px, 8vw, 72px);
  font-weight: 800;
  margin: 0 0 16px 0;
  line-height: 1.1;
  letter-spacing: -0.03em;
  text-shadow: 0 4px 24px rgba(0,0,0,0.4);
  
  /* Better mobile typography */
  @media (max-width: 768px) {
    font-size: clamp(28px, 9vw, 48px);
    line-height: 1.15;
    margin-bottom: 12px;
  }
  
  @media (max-width: 480px) {
    font-size: clamp(24px, 10vw, 36px);
    line-height: 1.2;
    margin-bottom: 10px;
    letter-spacing: -0.02em;
  }
  
  @media (max-width: 375px) {
    font-size: clamp(22px, 8vw, 32px);
  }
`;

const H2 = styled.h2`
  font-size: clamp(18px, 4vw, 32px);
  font-weight: 600;
  margin: 0 0 24px 0;
  opacity: 0.95;
  letter-spacing: -0.02em;
  text-shadow: 0 2px 16px rgba(0,0,0,0.3);
  
  /* Mobile typography adjustments */
  @media (max-width: 768px) {
    font-size: clamp(16px, 5vw, 24px);
    margin-bottom: 20px;
    line-height: 1.3;
  }
  
  @media (max-width: 480px) {
    font-size: clamp(15px, 4.5vw, 20px);
    margin-bottom: 16px;
    line-height: 1.35;
  }
  
  @media (max-width: 375px) {
    font-size: clamp(14px, 4vw, 18px);
  }
`;

const Sub = styled.p`
  font-size: clamp(14px, 2.5vw, 20px);
  margin: 0 0 48px 0;
  opacity: 0.85;
  font-weight: 400;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  text-shadow: 0 1px 8px rgba(0,0,0,0.2);
  
  /* Mobile text adjustments */
  @media (max-width: 768px) {
    font-size: clamp(14px, 3vw, 18px);
    max-width: 90%;
    margin-bottom: 32px;
    line-height: 1.5;
  }
  
  @media (max-width: 480px) {
    font-size: clamp(13px, 3.5vw, 16px);
    margin-bottom: 24px;
    line-height: 1.45;
  }
  
  @media (max-width: 375px) {
    font-size: 14px;
    max-width: 95%;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 64px;
`;

const PrimaryBtn = styled.button`
  background: var(--purple);
  color: white;
  padding: 16px 32px;
  border-radius: var(--radius-xl);
  font-size: 17px;
  font-weight: 600;
  letter-spacing: -0.01em;
  box-shadow: 0 8px 32px rgba(0,122,255,0.3);
  
  &:hover {
    background: var(--purple-hover);
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0,122,255,0.4);
  }
  
  &:active {
    transform: translateY(0) scale(0.98);
  }
`;

const SecondaryBtn = styled.button`
  background: rgba(255,255,255,0.15);
  color: white;
  border: 1px solid rgba(255,255,255,0.3);
  padding: 16px 32px;
  border-radius: var(--radius-xl);
  font-size: 17px;
  font-weight: 600;
  letter-spacing: -0.01em;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(255,255,255,0.25);
    border-color: rgba(255,255,255,0.5);
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0) scale(0.98);
  }
`;

const Stats = styled.div`
  display: flex;
  justify-content: center;
  gap: 48px;
  margin-bottom: 48px;
  flex-wrap: wrap;
`;

const StatItem = styled.div`
  text-align: center;
  
  .number {
    font-size: 28px;
    font-weight: 700;
    color: var(--purple);
    margin-bottom: 4px;
    text-shadow: 0 2px 10px rgba(0,122,255,0.3);
  }
  
  .star {
    font-size: 28px;
    color: #FFD700;
    margin-bottom: 4px;
    text-shadow: 0 2px 10px rgba(255,215,0,0.3);
  }
  
  div:last-child {
    font-size: 15px;
    opacity: 0.9;
    font-weight: 500;
  }
`;

const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
  max-width: 800px;
  margin: 0 auto;
`;

const FeatureCard = styled.div`
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  padding: 20px;
  border-radius: var(--radius-lg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  font-weight: 500;
  font-size: 15px;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    background: rgba(255,255,255,0.15);
    border-color: rgba(255,255,255,0.3);
    transform: translateY(-4px);
  }
`;

/* Removed CTA buttons and stats for a calmer hero */

/* Removed feature cards section */

const FooterPad = styled.div`
  height: 48px;
`;

function useInViewOnce(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setInView(true); });
      },
      { threshold: 0.18 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

/* Removed info bar animation hook */

// Fixed continuous loop animation with proper term transitions
function useSearchAnimation(inputValue) {
  const [animatedText, setAnimatedText] = useState('');
  const terms = ['AC Services\'', 'Kitchen Cleaning\'', 'Spa at Home\'', 'Massage Therapy\''];
  const [termIndex, setTermIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (inputValue !== '') {
      // Reset animation when user starts typing
      setAnimatedText('');
      setCharIndex(0);
      setIsTyping(true);
      setIsDeleting(false);
      return;
    }

    let timeout;
    const currentTerm = terms[termIndex];

    if (isTyping && !isDeleting) {
      // Typing phase
      if (charIndex < currentTerm.length) {
        timeout = setTimeout(() => {
          setCharIndex(prev => prev + 1);
          setAnimatedText(currentTerm.slice(0, charIndex + 1));
        }, 100); // Super fast typing: 100ms per char
      } else {
        // Word complete - pause then start deleting
        timeout = setTimeout(() => {
          setIsTyping(false);
          setIsDeleting(true);
        }, 800); // Super short pause: 0.8s
      }
    } else if (isDeleting && !isTyping) {
      // Deleting phase
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setCharIndex(prev => prev - 1);
          setAnimatedText(currentTerm.slice(0, charIndex - 1));
        }, 80); // Lightning fast deletion: 80ms per char
      } else {
        // Deletion complete - move to next term and start typing
        setIsDeleting(false);
        setIsTyping(true);
        setTermIndex(prev => (prev + 1) % terms.length);
        setCharIndex(0);
        setAnimatedText('');
      }
    }

    return () => clearTimeout(timeout);
  }, [inputValue, charIndex, isTyping, isDeleting, termIndex, terms]);

  return animatedText;
}

export default function App() {
  const heroStackRef = useRef(null);
  const heroIn = useInViewOnce(heroStackRef);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [mobileSearchValue, setMobileSearchValue] = useState('');
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const searchRef = useRef(null);
  const videoRef = useRef(null);
  
  // Use your provided animation logic for desktop search
  const animatedText = useSearchAnimation(searchValue);
  
  /* Removed info bar animation logic */

  useEffect(() => {
    function onDocClick(e){
      if(!searchRef.current) return;
      if(!searchRef.current.contains(e.target)) setSearchOpen(false);
    }
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);
  
  // Close mobile menu when clicking outside
  useEffect(() => {
    function handleOutsideClick(e) {
      if (menuOpen && !e.target.closest('.mobile-menu') && !e.target.closest('.burger-btn')) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [menuOpen]);
  
  // Handle mobile search
  const handleMobileSearch = () => {
    setMobileSearchOpen(true);
    setMenuOpen(false);
  };
  
  // Handle audio toggle
  const toggleAudio = () => {
    if (videoRef.current) {
      if (isVideoMuted) {
        videoRef.current.muted = false;
        setIsVideoMuted(false);
      } else {
        videoRef.current.muted = true;
        setIsVideoMuted(true);
      }
    }
  };

  return (
    <>
      <GlobalStyle />

      {/* Top Info Scroll Bar */}
      <InfoBar>
        <InfoStatic>
          <span>Operating Hours: 8AM-10PM</span>
          <InfoDot />
          <span>Customer Care: +1-XXX-XXX-XXXX</span>
        </InfoStatic>
        <InfoScrollWrap>
          <ScrollingText>COD</ScrollingText>
          <ScrollingText>Certified professionals</ScrollingText>
          <ScrollingText>Genuine & sealed products</ScrollingText>
          <ScrollingText>Punctual & professional team</ScrollingText>
          <ScrollingText>Affordable luxury packages</ScrollingText>
        </InfoScrollWrap>
      </InfoBar>

      {/* Header */}
      <Header>
        <Brand>
          <div className="logo">
            <img src="/saundarya-logo.png" alt="Saundarya Beauty Studio" />
          </div>
        </Brand>

        <Nav>
          <NavBtn>Beauty</NavBtn>
          <NavBtn>Revamp</NavBtn>
          <NavBtn>Native</NavBtn>
        </Nav>

        <SearchWrap ref={searchRef} className={searchOpen ? 'focus' : ''}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M21 21l-4.2-4.2M10.8 18a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4Z" stroke="#9CA3AF" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
          <input 
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setSearchOpen(true)} 
          />
          {searchValue === '' && (
            <TypewriterContainer>
              <StaticPrefix>Search for '</StaticPrefix>
              <TypedText>{animatedText}</TypedText>
            </TypewriterContainer>
          )}
          {searchOpen && (
            <SearchDropdown>
              <Trending>
                <TrendingTitle>Trending searches</TrendingTitle>
                <Chips>
                  {['Salon','Bathroom cleaning','Full home cleaning','Kitchen cleaning','Appliance repair','Massage','Spa luxe','Carpenters','Electricians','TV repair']
                    .map(t => (<Chip key={t}>{t}</Chip>))}
                </Chips>
              </Trending>
            </SearchDropdown>
          )}
        </SearchWrap>

        <LoginBtn>Login</LoginBtn>

        <MobileActions>
          <MobileSearchBtn onClick={handleMobileSearch} aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M21 21l-4.2-4.2M10.8 18a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </MobileSearchBtn>
          <Burger className="burger-btn" aria-label="Open menu" onClick={() => setMenuOpen(v => !v)}><span /></Burger>
        </MobileActions>
      </Header>

      <MobileMenu className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <MobileSearchContainer>
          <MobileSearchInput>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M21 21l-4.2-4.2M10.8 18a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
            <input 
              type="text"
              placeholder="Search for services..."
              value={mobileSearchValue}
              onChange={(e) => setMobileSearchValue(e.target.value)}
              autoComplete="off"
            />
          </MobileSearchInput>
        </MobileSearchContainer>
        
        <MobileLink onClick={() => setMenuOpen(false)}>Beauty</MobileLink>
        <MobileLink onClick={() => setMenuOpen(false)}>Revamp</MobileLink>
        <MobileLink onClick={() => setMenuOpen(false)}>Native</MobileLink>
        <MobileLink onClick={() => setMenuOpen(false)} style={{color:'white', background:'var(--purple)', borderRadius: '12px'}}>Login</MobileLink>
      </MobileMenu>

      <PageOffset />

      {/* Hero Section */}
      <Hero>
        {/* Video Background */}
        <VideoBg
          ref={videoRef}
          autoPlay
          muted={isVideoMuted}
          loop
          playsInline
          preload="metadata" /* Faster loading on mobile */
          poster="" /* Add a poster image for better loading experience */
        >
          <source src={heroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </VideoBg>

        {/* Dark Overlay */}
        <Tint />

        {/* Content */}
        <HeroContent>
          {/* Main Heading */}
          <H1>Luxurious & Hygienic</H1>
          <H2>Salon at home services, on demand</H2>
        </HeroContent>

        {/* Audio Toggle Button */}
        <AudioToggleBtn 
          className={isVideoMuted ? 'muted' : ''} 
          onClick={toggleAudio}
          aria-label={isVideoMuted ? 'Unmute video' : 'Mute video'}
        >
          {isVideoMuted ? (
            // Muted icon (speaker with X)
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <line x1="23" y1="9" x2="17" y2="15"></line>
              <line x1="17" y1="9" x2="23" y2="15"></line>
            </svg>
          ) : (
            // Unmuted icon (speaker with sound waves)
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>
          )}
        </AudioToggleBtn>
      </Hero>

      <FooterPad />
    </>
  );
}


