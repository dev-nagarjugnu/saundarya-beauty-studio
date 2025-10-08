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
  padding: 10px 18px; 
  border-radius: 999px;
  background: linear-gradient(90deg, #2A4A3A, #D4AF37);
  border: 1px solid rgba(0,0,0,0.04);
  color: #ffffff; 
  font-weight: 600;
  font-size: 14px;
  letter-spacing: -0.01em;
  box-shadow: 0 8px 24px rgba(212,175,55,.22), 0 2px 8px rgba(0,0,0,.12);
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
  white-space: nowrap;
  transition: transform .18s ease, box-shadow .18s ease;
  &:hover{ 
    transform: translateY(-1px);
    box-shadow: 0 14px 40px rgba(212,175,55,.28), 0 3px 10px rgba(0,0,0,.14);
  }
  &:active{ 
    transform: translateY(0);
    box-shadow: 0 6px 18px rgba(212,175,55,.22);
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
    /* Reduce quality on mobile for faster loading */
    filter: blur(0.5px); /* Slight blur to hide compression artifacts */
  }
  /* Hide video on very slow connections and show fallback */
  @media (max-width: 480px) and (max-resolution: 1.5dppx) {
    display: none;
  }
  /* Performance optimizations */
  will-change: transform; /* Optimize for animations */
  transform: translateZ(0); /* Hardware acceleration */
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
const VideoFallback = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    #667eea 0%,
    #764ba2 50%,
    #f093fb 100%
  );
  z-index: -3;
  /* Show fallback when video is hidden on slow connections */
  @media (max-width: 480px) and (max-resolution: 1.5dppx) {
    z-index: -2;
  }
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
const HeroActions = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 48px;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    gap: 16px;
    margin-bottom: 40px;
  }
  @media (max-width: 480px) {
    gap: 12px;
    margin-bottom: 32px;
    flex-direction: column;
    align-items: center;
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
// Premium Services Section - Using Manual Code with Framer Motion
const services = [
  {
    id: 1,
    title: "Women's Salon at Home",
    description: "Complete salon services delivered to your doorstep with professional care.",
    price: "₹899",
    category: "salon",
    icon: "✂️",
    image: "https://source.unsplash.com/300x200/?salon,elegant"
  },
  {
    id: 2,
    title: "Women's Spa at Home",
    description: "Relaxing spa treatments and wellness therapies in your comfort zone.",
    price: "₹1,299",
    category: "spa",
    icon: "🌿",
    image: "https://source.unsplash.com/300x200/?spa,serene"
  },
  {
    id: 3,
    title: "Bridal Services at Home",
    description: "Complete bridal makeover packages for your perfect wedding day.",
    price: "₹4,999",
    category: "bridal",
    icon: "💍",
    image: "https://source.unsplash.com/300x200/?bridal,luxury"
  },
  {
    id: 4,
    title: "Pre Bridal Services at Home",
    description: "Pre-wedding beauty treatments to prepare you for the big day.",
    price: "₹2,499",
    category: "bridal",
    icon: "💎",
    image: "https://source.unsplash.com/300x200/?pre-bridal,glow"
  },
  {
    id: 5,
    title: "Mehndi Services at Home",
    description: "Beautiful henna designs and traditional mehndi artistry at home.",
    price: "₹1,599",
    category: "salon",
    icon: "🎨",
    image: "https://source.unsplash.com/300x200/?mehndi,henna"
  },
  {
    id: 6,
    title: "Hair Services at Home",
    description: "Professional hair cutting, styling, coloring and treatments at home.",
    price: "₹699",
    category: "salon",
    icon: "🪒",
    image: "https://source.unsplash.com/300x200/?hair,styling"
  },
  {
    id: 7,
    title: "Makeup Services at Home",
    description: "Professional makeup artistry for all occasions delivered to you.",
    price: "₹1,199",
    category: "bridal",
    icon: "💄",
    image: "https://source.unsplash.com/300x200/?makeup,professional"
  },
  {
    id: 8,
    title: "Skin & Body Treatments at Home",
    description: "Rejuvenating skin and body care treatments in your personal space.",
    price: "₹1,899",
    category: "spa",
    icon: "🧴",
    image: "https://source.unsplash.com/300x200/?skin,care"
  }
];
const categories = [
  { id: 'all', label: 'All Services', active: true },
  { id: 'salon', label: 'Salon' },
  { id: 'spa', label: 'Spa' },
  { id: 'bridal', label: 'Bridal' }
];
const PremiumServicesSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredCard, setHoveredCard] = useState(null);
  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(service => service.category === activeCategory);
  return (
    <section style={{
      position: 'relative',
      padding: '5rem 1rem',
      background: 'linear-gradient(135deg, #E8D5E8 0%, #ffffff 50%, #EDE4D9 100%)',
      overflow: 'hidden'
    }}>
      {/* Subtle animated overlay for depth */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.05,
          background: 'linear-gradient(45deg, #E8D5E8 0%, #C9A96E 50%, #E8D5E8 100%)',
          animation: 'pulse 15s ease-in-out infinite'
        }}
      />
      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '80rem',
        margin: '0 auto'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '4rem'
        }}>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 5vw, 3rem)',
            fontFamily: 'Playfair Display, serif',
            color: '#2A4A3A',
            marginBottom: '1rem'
          }}>
            Our Premium Services
          </h2>
          <p style={{
            fontSize: 'clamp(1.125rem, 2vw, 1.25rem)',
            color: '#6B7280',
            maxWidth: '32rem',
            margin: '0 auto'
          }}>
            Experience luxury beauty and wellness services at your doorstep with our professional home service packages.
          </p>
        </div>
        {/* Dynamic category navigator */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '3rem',
          flexWrap: 'wrap'
        }}>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: '0.5rem 1.5rem',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: 500,
                transition: 'all 0.3s ease',
                background: activeCategory === cat.id 
                  ? '#D4AF37' 
                  : 'rgba(255, 255, 255, 0.5)',
                color: activeCategory === cat.id 
                  ? 'white' 
                  : '#2A4A3A',
                border: 'none',
                cursor: 'pointer',
                boxShadow: activeCategory === cat.id 
                  ? '0 4px 14px 0 rgba(212, 175, 55, 0.25)' 
                  : 'none'
              }}
              onMouseEnter={(e) => {
                if (activeCategory !== cat.id) {
                  e.target.style.background = 'rgba(255, 255, 255, 0.8)';
                  e.target.style.transform = 'scale(1.05) translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== cat.id) {
                  e.target.style.background = 'rgba(255, 255, 255, 0.5)';
                  e.target.style.transform = 'scale(1) translateY(0)';
                }
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
        {/* Interactive grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}>
          {filteredServices.map((service, index) => (
            <div
              key={service.id}
              style={{
                background: 'white',
                borderRadius: '1rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.5s ease',
                position: 'relative'
              }}
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={(e) => {
                setHoveredCard(null);
                e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1) translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02) translateY(-8px)`;
                e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
              }}
            >
              {/* Image with gradient overlay */}
              <div style={{
                position: 'relative',
                height: '12rem',
                width: '100%',
                overflow: 'hidden'
              }}>
                <img 
                  src={service.image} 
                  alt={service.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'all 0.7s ease',
                    filter: hoveredCard === service.id ? 'brightness(1.1)' : 'brightness(1)'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(to top, rgba(42, 74, 58, 0.6) 0%, transparent 100%)`,
                  opacity: hoveredCard === service.id ? 1 : 0,
                  transition: 'opacity 0.5s ease'
                }} />
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  opacity: hoveredCard === service.id ? 1 : 0,
                  transition: 'all 0.3s ease',
                  transform: hoveredCard === service.id ? 'translateX(0)' : 'translateX(-20px)'
                }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    background: '#D4AF37',
                    color: 'white'
                  }}>
                    {service.icon} {service.category.toUpperCase()}
                  </span>
                </div>
              </div>
              {/* Content */}
              <div style={{
                padding: '1.5rem',
                transform: hoveredCard === service.id ? 'translateY(0)' : 'translateY(20px)',
                opacity: hoveredCard === service.id ? 1 : 0.8,
                transition: 'all 0.4s ease'
              }}>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontFamily: 'Playfair Display, serif',
                  fontWeight: 600,
                  color: '#2A4A3A',
                  marginBottom: '0.5rem'
                }}>
                  {service.title}
                </h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: '#6B7280',
                  marginBottom: '1rem',
                  lineHeight: 1.6
                }}>
                  {service.description}
                </p>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: '#D4AF37'
                  }}>{service.price}</span>
                  <button style={{
                    color: '#D4AF37',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateX(4px)';
                    e.target.style.textDecoration = 'underline';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateX(0)';
                    e.target.style.textDecoration = 'none';
                  }}
                  >
                    Explore →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
// Premium Video Testimonials Section - Using Manual Code with Framer Motion
const videoTestimonials = [
  {
    id: 1,
    title: "Neha's Bridal Transformation",
    description: "Complete makeover experience for her special day.",
    duration: "2:34",
    thumbnail: "https://source.unsplash.com/400x300/?bridal,transformation,elegant",
    videoUrl: "#",
    category: "bridal"
  },
  {
    id: 2,
    title: "Ritu's Spa Experience",
    description: "Relaxing home spa treatment journey.",
    duration: "1:45",
    thumbnail: "https://source.unsplash.com/400x300/?spa,relaxation,luxury",
    videoUrl: "#",
    category: "spa"
  },
  {
    id: 3,
    title: "Sunita's Hair Makeover",
    description: "Professional hair styling at home.",
    duration: "3:12",
    thumbnail: "https://source.unsplash.com/400x300/?hair,makeover,style",
    videoUrl: "#",
    category: "salon"
  },
  {
    id: 4,
    title: "Meera's Pre-Bridal Care",
    description: "Complete pre-wedding beauty routine.",
    duration: "4:28",
    thumbnail: "https://source.unsplash.com/400x300/?pre-bridal,care,glow",
    videoUrl: "#",
    category: "bridal"
  }
];
const LegacyVideoTestimonialsSection = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const openModal = (testimonial) => {
    setActiveTestimonial(testimonial);
  };
  const closeModal = () => {
    setActiveTestimonial(null);
  };
  return (
    <section style={{
      position: 'relative',
      padding: '5rem 1rem',
      background: 'linear-gradient(135deg, #EDE4D9 0%, #E8D5E8 50%, #2A4A3A 100%)',
      overflow: 'hidden'
    }}>
      {/* Ambient gradient animation for subtle depth */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.1,
          background: 'linear-gradient(45deg, #EDE4D9 0%, #E8D5E8 50%, #2A4A3A 100%)',
          animation: 'pulse 20s ease-in-out infinite'
        }}
      />
      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '75rem',
        margin: '0 auto'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '4rem'
        }}>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 5vw, 3rem)',
            fontFamily: 'Playfair Display, serif',
            color: '#2A4A3A',
            marginBottom: '1rem'
          }}>
            Client Stories
          </h2>
          <p style={{
            fontSize: 'clamp(1.125rem, 2vw, 1.25rem)',
            color: '#6B7280',
            maxWidth: '32rem',
            margin: '0 auto'
          }}>
            Hear what our clients have to say about their transformation journey with us.
          </p>
        </div>
        {/* Horizontal carousel-like grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}>
          {videoTestimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '1rem',
                background: 'white',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                aspectRatio: '16/9',
                transition: 'all 0.7s ease'
              }}
              onMouseEnter={() => setHoveredId(testimonial.id)}
              onMouseLeave={(e) => {
                setHoveredId(null);
                e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
              }}
              onClick={() => openModal(testimonial)}
              onMouseMove={(e) => {
                if (hoveredId === testimonial.id) {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;
                  const rotateY = (x - centerX) / 20;
                  const rotateX = (centerY - y) / 20;
                  e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
                  e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
                }
              }}
            >
              {/* Thumbnail with dynamic overlay and play button reveal */}
              <div style={{
                position: 'relative',
                width: '100%',
                height: '100%'
              }}>
                <img 
                  src={testimonial.thumbnail} 
                  alt={testimonial.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.7s ease',
                    transform: hoveredId === testimonial.id ? 'scale(1.1)' : 'scale(1)'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(to top, rgba(42, 74, 58, 0.7) 0%, transparent 100%)`,
                  opacity: hoveredId === testimonial.id ? 1 : 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'opacity 0.5s ease'
                }}>
                  <div style={{
                    background: 'rgba(212, 175, 55, 0.9)',
                    color: 'white',
                    padding: '1rem',
                    borderRadius: '50%',
                    boxShadow: '0 4px 14px 0 rgba(0, 0, 0, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    transform: hoveredId === testimonial.id ? 'scale(1.1)' : 'scale(1)'
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5,3 19,12 5,21"/>
                    </svg>
                  </div>
                </div>
                {/* Category badge */}
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'rgba(232, 213, 232, 0.8)',
                  color: '#2A4A3A',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  opacity: hoveredId === testimonial.id ? 1 : 0,
                  transform: hoveredId === testimonial.id ? 'translateX(0)' : 'translateX(20px)',
                  transition: 'all 0.3s ease'
                }}>
                  {testimonial.category.toUpperCase()}
                </div>
              </div>
              {/* Content panel - elegant slide-up on hover */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: `linear-gradient(to top, rgba(42, 74, 58, 0.95) 0%, transparent 100%)`,
                padding: '1.5rem',
                color: 'white',
                opacity: hoveredId === testimonial.id ? 1 : 0,
                transform: hoveredId === testimonial.id ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.4s ease'
              }}>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontFamily: 'Playfair Display, serif',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  lineHeight: 1.2
                }}>
                  {testimonial.title}
                </h3>
                <p style={{
                  fontSize: '0.875rem',
                  marginBottom: '0.5rem',
                  opacity: 0.9,
                  lineHeight: 1.6
                }}>
                  {testimonial.description}
                </p>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.75rem',
                  opacity: 0.8
                }}>
                  <span>{testimonial.duration}</span>
                  <span style={{
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateX(2px)';
                    e.target.style.textDecoration = 'underline';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateX(0)';
                    e.target.style.textDecoration = 'none';
                  }}
                  >
                    Play Story →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Modal for video playback */}
      {activeTestimonial && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
          onClick={closeModal}
        >
          <div 
            style={{
              position: 'relative',
              maxWidth: '64rem',
              width: '100%',
              aspectRatio: '16/9',
              background: '#2A4A3A',
              borderRadius: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '1.5rem'
            }}
            onClick={e => e.stopPropagation()}
          >
            Video Player Placeholder: {activeTestimonial.title}
            <button 
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                color: 'white',
                background: 'rgba(0, 0, 0, 0.3)',
                border: 'none',
                borderRadius: '50%',
                width: '2rem',
                height: '2rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(0, 0, 0, 0.5)';
                e.target.style.color = '#D4AF37';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(0, 0, 0, 0.3)';
                e.target.style.color = 'white';
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
// Premium Written Testimonials Section - Using Manual Code with Framer Motion
const testimonialsData = [
  {
    id: 1,
    quote: "Saundarya completely transformed my look for my wedding. The team was professional, intelligent, and made me feel like a princess.",
    rating: 5,
    author: "Neha Verma",
    avatar: "https://source.unsplash.com/40x40/?woman,portrait1",
    service: "Complete Makeover",
    time: "2 weeks ago",
    category: "bridal"
  },
  {
    id: 2,
    quote: "My skin has never looked better! The relaxing atmosphere and expert care make every visit a delightful experience.",
    rating: 5,
    author: "Ritu Agarwal",
    avatar: "https://source.unsplash.com/40x40/?woman,portrait2",
    service: "Facial & Spa",
    time: "1 month ago",
    category: "spa"
  },
  {
    id: 3,
    quote: "Amazing hair transformation! They delivered beyond my expectations with the perfect cut and color.",
    rating: 5,
    author: "Sunita Kapoor",
    avatar: "https://source.unsplash.com/40x40/?woman,portrait3",
    service: "Hair Styling",
    time: "3 weeks ago",
    category: "salon"
  },
  {
    id: 4,
    quote: "Best decision for my bridal package! Everything was flawless and I looked gorgeous on my special day.",
    rating: 5,
    author: "Meera Joshi",
    avatar: "https://source.unsplash.com/40x40/?woman,portrait4",
    service: "Bridal Package",
    time: "2 months ago",
    category: "bridal"
  },
  {
    id: 5,
    quote: "Consistent quality of service every time. The staff treats you like family with amazing results.",
    rating: 5,
    author: "Divya Patel",
    avatar: "https://source.unsplash.com/40x40/?woman,portrait5",
    service: "Regular Client",
    time: "5 days ago",
    category: "salon"
  },
  {
    id: 6,
    quote: "The nail designs are absolutely creative and beautiful. The attention to detail is incredible.",
    rating: 5,
    author: "Pooja Sharma",
    avatar: "https://source.unsplash.com/40x40/?woman,portrait6",
    service: "Nail Art",
    time: "1 week ago",
    category: "salon"
  }
];
const TestimonialsSection = () => {
  const [inView, setInView] = useState(false);
  return (
    <section style={{
      position: 'relative',
      padding: '5rem 1rem',
      background: 'linear-gradient(135deg, #2A4A3A 0%, #EDE4D9 50%, #E8D5E8 100%)',
      overflow: 'hidden'
    }}>
      {/* Layered wave animation in background for organic flow */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.05,
          background: 'linear-gradient(45deg, #2A4A3A 0%, #EDE4D9 50%, #E8D5E8 100%)',
          animation: 'pulse 25s ease-in-out infinite'
        }}
      >
        <svg viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" 
             style={{ width: '100%', height: '100%' }}>
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor" />
        </svg>
      </div>
      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '80rem',
        margin: '0 auto'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '4rem'
        }}>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 5vw, 3rem)',
            fontFamily: 'Playfair Display, serif',
            color: '#D4AF37',
            marginBottom: '1rem'
          }}>
            What Our Clients Say
          </h2>
          <p style={{
            fontSize: 'clamp(1.125rem, 2vw, 1.25rem)',
            color: '#2A4A3A',
            maxWidth: '32rem',
            margin: '0 auto'
          }}>
            Read the beautiful experiences shared by our valued clients.
          </p>
        </div>
        {/* Masonry-inspired grid with variable heights */}
        <div style={{
          columns: '1',
          columnGap: '1.5rem'
        }}>
          <style>{`
            @media (min-width: 768px) {
              .testimonials-grid {
                columns: 2;
              }
            }
            @media (min-width: 1024px) {
              .testimonials-grid {
                columns: 3;
              }
            }
            .testimonial-card {
              break-inside: avoid;
              margin-bottom: 1.5rem;
            }
          `}</style>
          <div className="testimonials-grid">
            {testimonialsData.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="testimonial-card"
                style={{
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: '0.75rem',
                    padding: '1.5rem',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                    border: '1px solid rgba(201, 169, 110, 0.1)',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.7s ease',
                    transform: 'perspective(1000px) translateY(0)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'perspective(1000px) rotateX(1deg) translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(201, 169, 110, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
                    e.currentTarget.style.borderColor = 'rgba(201, 169, 110, 0.1)';
                  }}
                >
                  {/* Full quote always visible */}
                  <p style={{
                    color: '#374151',
                    lineHeight: '1.6',
                    fontStyle: 'italic',
                    fontSize: '0.875rem',
                    marginBottom: '1rem',
                    transition: 'lineHeight 0.4s ease'
                  }}>
                    "{testimonial.quote}"
                  </p>
                  {/* Stars with subtle pulse */}
                  <div style={{
                    display: 'flex',
                    marginBottom: '1rem',
                    gap: '0'
                  }}>
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        style={{
                          fontSize: '1rem',
                          color: i < testimonial.rating ? '#D4AF37' : '#D1D5DB',
                          transform: i < testimonial.rating ? 'scale(1)' : 'scale(0.7)',
                          filter: i < testimonial.rating ? 'drop-shadow(0 0 8px rgba(201, 169, 110, 0.5))' : 'none',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          if (i < testimonial.rating) {
                            e.currentTarget.style.transform = 'scale(1.1)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = i < testimonial.rating ? 'scale(1)' : 'scale(0.7)';
                        }}
                      >
                        ★
                      </div>
                    ))}
                  </div>
                  {/* Author section with photo-real avatar */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    paddingTop: '0.5rem',
                    borderTop: '1px solid rgba(201, 169, 110, 0.1)'
                  }}>
                    <img 
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      style={{
                        width: '2.5rem',
                        height: '2.5rem',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px solid rgba(201, 169, 110, 0.2)',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px) rotate(5deg)';
                        e.currentTarget.style.borderColor = 'rgba(201, 169, 110, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0) rotate(0deg)';
                        e.currentTarget.style.borderColor = 'rgba(201, 169, 110, 0.2)';
                      }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{
                        fontFamily: 'Playfair Display, serif',
                        fontWeight: 600,
                        color: '#2A4A3A',
                        fontSize: '0.875rem',
                        margin: 0,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>{testimonial.author}</p>
                      <p style={{
                        fontSize: '0.75rem',
                        color: '#6B7280',
                        margin: 0,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>{testimonial.service}</p>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: '0.75rem',
                      color: '#9CA3AF',
                      transition: 'color 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'rgb(201, 169, 110)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#9CA3AF';
                    }}
                    >
                      🕐 {testimonial.time}
                    </div>
                  </div>
                  {/* Subtle quote mark in corner */}
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    color: '#D1D5DB',
                    fontSize: '1.5rem',
                    opacity: 0.6,
                    transition: 'all 0.3s ease'
                  }}>
                    "
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
// Premium Achievements Section - Using Manual Code with Framer Motion
const AchievementSectionContainer = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5rem 1rem;
  background: linear-gradient(135deg, #EDE4D9 0%, #E8D5E8 50%, #2A4A3A 100%);
  overflow: hidden;
`;
const AchievementContent = styled.div`
  position: relative;
  z-index: 10;
  max-width: 75rem;
  width: 100%;
  text-align: center;
`;
const stats = [
  { 
    value: 5, 
    suffix: '+', 
    label: 'Years of Excellence', 
    subtext: 'Consistently delivering premium beauty services with passion and precision',
    icon: '🕐'
  },
  { 
    value: 10000, 
    suffix: '+', 
    label: 'Happy Clients', 
    subtext: 'Transforming lives through exceptional beauty and wellness experiences',
    icon: '👥'
  },
  { 
    value: 50, 
    suffix: '+', 
    label: 'Expert Professionals', 
    subtext: 'Certified specialists dedicated to your beauty satisfaction',
    icon: '👩‍⚕️'
  },
  { 
    value: 100, 
    suffix: '%', 
    label: 'Satisfaction Rate', 
    subtext: 'Exceeding expectations with every service we deliver',
    icon: '⭐'
  },
];
const AchievementSection = () => {
  return (
    <AchievementSectionContainer>
      <AchievementContent>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          fontFamily: 'Playfair Display, serif',
          marginBottom: '1rem',
          color: '#2A4A3A',
          textAlign: 'center'
        }}>
          Our Journey of Excellence
        </h1>
        <p style={{
          fontSize: 'clamp(1.125rem, 2vw, 1.25rem)',
          color: '#6B7280',
          marginBottom: '4rem',
          maxWidth: '32rem',
          margin: '0 auto 4rem auto',
          textAlign: 'center'
        }}>
          A testament to our unwavering commitment to delivering exceptional beauty experiences.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {stats.map((stat, index) => (
            <div
              key={index}
              style={{
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(12px)',
                padding: '2rem',
                borderRadius: '1rem',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                border: '1px solid rgba(255, 255, 255, 0.5)',
                cursor: 'default',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.5s ease',
                textAlign: 'center'
              }}
            >
              <div style={{
                fontSize: '2.5rem',
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                {stat.icon}
              </div>
              <div style={{
                fontSize: 'clamp(2.5rem, 5vw, 3rem)',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #D4AF37 0%, #2A4A3A 50%, #E8D5E8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textAlign: 'center',
                display: 'block',
                marginBottom: '1rem'
              }}>
                {stat.value.toLocaleString()}{stat.suffix}
              </div>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: 600,
                color: '#2A4A3A',
                marginBottom: '0.5rem',
                textAlign: 'center'
              }}>{stat.label}</h3>
              <p style={{
                fontSize: '0.875rem',
                color: '#6B7280',
                lineHeight: 1.6,
                textAlign: 'center'
              }}>{stat.subtext}</p>
            </div>
          ))}
        </div>
      </AchievementContent>
    </AchievementSectionContainer>
  );
};
// Premium Achievements Section Styles
const AchievementsSection = styled.section`
  padding: 140px 0;
  background: linear-gradient(135deg, #fafbfc 0%, #f8fafc 50%, #f1f5f9 100%);
  position: relative;
  overflow: hidden;
  /* Premium subtle pattern */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(circle at 20% 20%, rgba(102, 126, 234, 0.02) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(118, 75, 162, 0.02) 0%, transparent 50%);
    pointer-events: none;
  }
  @media (max-width: 768px) {
    padding: 100px 0;
  }
  @media (max-width: 480px) {
    padding: 80px 0;
  }
`;
const AchievementsContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 max(24px, env(safe-area-inset-left));
  position: relative;
  z-index: 1;
  @media (max-width: 768px) {
    padding: 0 20px;
  }
  @media (max-width: 480px) {
    padding: 0 16px;
  }
`;
const AchievementsHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
  @media (max-width: 768px) {
    margin-bottom: 50px;
  }
  @media (max-width: 480px) {
    margin-bottom: 40px;
  }
`;
const AchievementsTitle = styled.h2`
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 300;
  line-height: 1.2;
  letter-spacing: -0.01em;
  margin: 0 0 20px 0;
  color: #1a1a1a;
  .gradient-text {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 400;
  }
  @media (max-width: 768px) {
    font-size: clamp(28px, 5vw, 40px);
    margin-bottom: 16px;
  }
  @media (max-width: 480px) {
    font-size: clamp(24px, 6vw, 32px);
    margin-bottom: 14px;
  }
`;
const AchievementsSubtitle = styled.p`
  font-size: clamp(15px, 2.2vw, 18px);
  font-weight: 400;
  line-height: 1.6;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto;
  opacity: 0.9;
  @media (max-width: 768px) {
    font-size: clamp(14px, 2.8vw, 16px);
    max-width: 90%;
  }
  @media (max-width: 480px) {
    font-size: clamp(13px, 3.2vw, 15px);
    max-width: 95%;
  }
`;
const AchievementsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 80px;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  /* Elegant connecting lines */
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 12.5%;
    right: 12.5%;
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, #e2e8f0 20%, #e2e8f0 80%, transparent 100%);
    z-index: 0;
  }
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 60px;
    &::before {
      display: none;
    }
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 48px;
  }
`;
const AchievementCard = styled.div`
  text-align: center;
  padding: 0;
  background: transparent;
  position: relative;
  z-index: 1;
  /* Premium floating effect */
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 120px;
    height: 120px;
    background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 
      0 20px 60px rgba(0, 0, 0, 0.08),
      0 8px 32px rgba(0, 0, 0, 0.04),
      inset 0 1px 0 rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: -1;
  }
  &:hover::before {
    transform: translate(-50%, -50%) scale(1.1);
    box-shadow: 
      0 32px 80px rgba(0, 0, 0, 0.12),
      0 16px 48px rgba(0, 0, 0, 0.08),
      inset 0 1px 0 rgba(255, 255, 255, 0.9);
  }
  @media (max-width: 768px) {
    &::before {
      width: 100px;
      height: 100px;
    }
  }
  @media (max-width: 480px) {
    &::before {
      width: 80px;
      height: 80px;
    }
  }
`;
const AchievementIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
  svg {
    width: 36px;
    height: 36px;
    color: white;
    filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.2));
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
  ${AchievementCard}:hover &::after {
    left: 100%;
  }
  @media (max-width: 768px) {
    width: 64px;
    height: 64px;
    margin-bottom: 20px;
    border-radius: 16px;
    svg {
      width: 28px;
      height: 28px;
    }
  }
  @media (max-width: 480px) {
    width: 56px;
    height: 56px;
    margin-bottom: 16px;
    border-radius: 14px;
    svg {
      width: 24px;
      height: 24px;
    }
  }
`;
const AchievementNumber = styled.div`
  font-size: clamp(56px, 7vw, 72px);
  font-weight: 200;
  line-height: 1;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #1a1a1a 0%, #4a5568 50%, #1a1a1a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  letter-spacing: -0.02em;
  /* Premium glow effect */
  &::after {
    content: attr(data-number);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: blur(2px);
    opacity: 0.3;
    z-index: -1;
  }
  @media (max-width: 768px) {
    font-size: clamp(48px, 8vw, 64px);
    margin-bottom: 16px;
  }
  @media (max-width: 480px) {
    font-size: clamp(40px, 9vw, 56px);
    margin-bottom: 14px;
  }
`;
const AchievementLabel = styled.h3`
  font-size: clamp(14px, 2.2vw, 16px);
  font-weight: 600;
  line-height: 1.3;
  margin: 0 0 16px 0;
  color: #2d3748;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  position: relative;
  /* Elegant underline */
  &::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 24px;
    height: 2px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 1px;
    opacity: 0.6;
  }
  @media (max-width: 768px) {
    font-size: clamp(13px, 2.8vw, 15px);
    margin-bottom: 14px;
  }
  @media (max-width: 480px) {
    font-size: clamp(12px, 3.2vw, 14px);
    margin-bottom: 12px;
  }
`;
const AchievementDescription = styled.p`
  font-size: clamp(12px, 1.8vw, 13px);
  font-weight: 400;
  line-height: 1.7;
  margin: 0;
  color: #64748b;
  opacity: 0.85;
  max-width: 200px;
  margin: 0 auto;
  font-style: italic;
  @media (max-width: 768px) {
    font-size: clamp(11px, 2.2vw, 12px);
    max-width: 180px;
  }
  @media (max-width: 480px) {
    font-size: clamp(10px, 2.8vw, 11px);
    max-width: 160px;
  }
`;
// Premium Services Section Styles (legacy)
const LegacyServicesSectionStyles = styled.section`
  padding: 120px 0;
  background: #f8f9fa;
  position: relative;
  overflow: hidden;
  @media (max-width: 768px) {
    padding: 80px 0;
  }
  @media (max-width: 480px) {
    padding: 60px 0;
  }
`;
const ServicesContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 max(24px, env(safe-area-inset-left));
  position: relative;
  z-index: 1;
  @media (max-width: 768px) {
    padding: 0 20px;
  }
  @media (max-width: 480px) {
    padding: 0 16px;
  }
`;
const ServicesHeader = styled.div`
  text-align: center;
  margin-bottom: 80px;
  @media (max-width: 768px) {
    margin-bottom: 60px;
  }
  @media (max-width: 480px) {
    margin-bottom: 40px;
  }
`;
const ServicesTitle = styled.h2`
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 300;
  line-height: 1.2;
  letter-spacing: -0.01em;
  margin: 0 0 20px 0;
  color: #1a1a1a;
  .gradient-text {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 400;
  }
  @media (max-width: 768px) {
    font-size: clamp(28px, 5vw, 40px);
    margin-bottom: 16px;
  }
  @media (max-width: 480px) {
    font-size: clamp(24px, 6vw, 32px);
    margin-bottom: 14px;
  }
`;
const ServicesSubtitle = styled.p`
  font-size: clamp(16px, 2.5vw, 20px);
  font-weight: 400;
  line-height: 1.6;
  color: var(--text-secondary);
  max-width: 700px;
  margin: 0 auto;
  opacity: 0.9;
  @media (max-width: 768px) {
    font-size: clamp(15px, 3vw, 18px);
    max-width: 90%;
  }
  @media (max-width: 480px) {
    font-size: clamp(14px, 3.5vw, 16px);
    max-width: 95%;
  }
`;
const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  max-width: 1400px;
  margin: 0 auto;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;
const ServiceCard = styled.div`
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.08);
    border-color: rgba(0, 0, 0, 0.1);
  }
  @media (max-width: 768px) {
    border-radius: 14px;
  }
  @media (max-width: 480px) {
    border-radius: 12px;
  }
`;
const ServiceImage = styled.div`
  height: 160px;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  .service-placeholder {
    width: 64px;
    height: 64px;
    background: #e2e8f0;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      width: 28px;
      height: 28px;
      color: #64748b;
    }
  }
  @media (max-width: 768px) {
    height: 140px;
    .service-placeholder {
      width: 56px;
      height: 56px;
      border-radius: 10px;
      svg {
        width: 24px;
        height: 24px;
      }
    }
  }
  @media (max-width: 480px) {
    height: 120px;
    .service-placeholder {
      width: 48px;
      height: 48px;
      border-radius: 8px;
      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`;
const ServiceContent = styled.div`
  padding: 24px 20px;
  position: relative;
  @media (max-width: 768px) {
    padding: 20px 16px;
  }
  @media (max-width: 480px) {
    padding: 16px 12px;
  }
`;
const ServiceTitle = styled.h3`
  font-size: clamp(16px, 2.5vw, 18px);
  font-weight: 600;
  line-height: 1.4;
  margin: 0 0 8px 0;
  color: #1a1a1a;
  letter-spacing: -0.01em;
  @media (max-width: 768px) {
    font-size: clamp(15px, 3vw, 17px);
    margin-bottom: 6px;
  }
  @media (max-width: 480px) {
    font-size: clamp(14px, 3.5vw, 16px);
    margin-bottom: 6px;
  }
`;
const ServiceDescription = styled.p`
  font-size: clamp(13px, 2vw, 14px);
  font-weight: 400;
  line-height: 1.6;
  margin: 0 0 12px 0;
  color: #64748b;
  opacity: 0.9;
  @media (max-width: 768px) {
    font-size: clamp(12px, 2.5vw, 13px);
    margin-bottom: 10px;
  }
  @media (max-width: 480px) {
    font-size: clamp(11px, 3vw, 12px);
    margin-bottom: 8px;
  }
`;
const ServicePrice = styled.div`
  font-size: clamp(14px, 2.5vw, 16px);
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
  position: relative;
  @media (max-width: 768px) {
    font-size: clamp(13px, 3vw, 15px);
  }
  @media (max-width: 480px) {
    font-size: clamp(12px, 3.5vw, 14px);
  }
`;
// Premium Written Testimonials Section Styles
const WrittenTestimonialsSection = styled.section`
  padding: 120px 0;
  background: #f8f9fa;
  position: relative;
  overflow: hidden;
  @media (max-width: 768px) {
    padding: 80px 0;
  }
  @media (max-width: 480px) {
    padding: 60px 0;
  }
`;
const WrittenTestimonialsContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 max(24px, env(safe-area-inset-left));
  position: relative;
  z-index: 1;
  @media (max-width: 768px) {
    padding: 0 20px;
  }
  @media (max-width: 480px) {
    padding: 0 16px;
  }
`;
const WrittenTestimonialsHeader = styled.div`
  text-align: center;
  margin-bottom: 80px;
  @media (max-width: 768px) {
    margin-bottom: 60px;
  }
  @media (max-width: 480px) {
    margin-bottom: 40px;
  }
`;
const WrittenTestimonialsTitle = styled.h2`
  font-size: clamp(36px, 5vw, 56px);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin: 0 0 24px 0;
  color: var(--text);
  .gradient-text {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
      border-radius: 2px;
      opacity: 0.3;
    }
  }
  @media (max-width: 768px) {
    font-size: clamp(28px, 6vw, 42px);
    margin-bottom: 20px;
  }
  @media (max-width: 480px) {
    font-size: clamp(24px, 7vw, 36px);
    margin-bottom: 16px;
  }
`;
const WrittenTestimonialsSubtitle = styled.p`
  font-size: clamp(16px, 2.5vw, 20px);
  font-weight: 400;
  line-height: 1.6;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
  opacity: 0.9;
  @media (max-width: 768px) {
    font-size: clamp(15px, 3vw, 18px);
    max-width: 90%;
  }
  @media (max-width: 480px) {
    font-size: clamp(14px, 3.5vw, 16px);
    max-width: 95%;
  }
`;
const WrittenTestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  max-width: 1400px;
  margin: 0 auto;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;
const TestimonialCard = styled.div`
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 16px;
  padding: 32px 28px;
  position: relative;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
  /* Premium glass effect */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
    border-radius: 24px;
    pointer-events: none;
    z-index: 1;
  }
  /* Premium quote decoration */
  &::after {
    content: '"';
    position: absolute;
    top: 20px;
    right: 24px;
    font-size: 48px;
    font-weight: 300;
    color: rgba(102, 126, 234, 0.15);
    font-family: 'Georgia', serif;
    line-height: 1;
    z-index: 0;
  }
  /* Featured card styling */
  &.featured {
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
    border-color: rgba(102, 126, 234, 0.2);
    transform: scale(1.02);
    &::before {
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.05) 100%);
    }
    &::after {
      color: rgba(102, 126, 234, 0.25);
    }
  }
  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 
      0 20px 64px rgba(0, 0, 0, 0.08),
      0 8px 32px rgba(0, 0, 0, 0.04);
    border-color: rgba(102, 126, 234, 0.3);
    &.featured {
      transform: translateY(-8px) scale(1.04);
    }
  }
  &:active {
    transform: translateY(-4px) scale(1.01);
  }
  @media (max-width: 768px) {
    padding: 28px 24px;
    border-radius: 20px;
    &::after {
      top: 16px;
      right: 20px;
      font-size: 40px;
    }
    &.featured {
      transform: none;
    }
    &:hover {
      transform: translateY(-4px);
      &.featured {
        transform: translateY(-4px);
      }
    }
  }
  @media (max-width: 480px) {
    padding: 24px 20px;
    border-radius: 16px;
    &::after {
      top: 12px;
      right: 16px;
      font-size: 32px;
    }
  }
`;
const TestimonialRating = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 20px;
  position: relative;
  z-index: 2;
  @media (max-width: 768px) {
    margin-bottom: 16px;
    gap: 3px;
  }
  @media (max-width: 480px) {
    margin-bottom: 12px;
    gap: 2px;
  }
`;
const Star = styled.span`
  font-size: 20px;
  color: #FFD700;
  text-shadow: 0 2px 8px rgba(255, 215, 0, 0.3);
  filter: drop-shadow(0 1px 4px rgba(255, 215, 0, 0.2));
  transition: all 0.2s ease;
  &:hover {
    transform: scale(1.1);
    filter: drop-shadow(0 2px 8px rgba(255, 215, 0, 0.4));
  }
  @media (max-width: 768px) {
    font-size: 18px;
  }
  @media (max-width: 480px) {
    font-size: 16px;
  }
`;
const TestimonialQuote = styled.p`
  font-size: clamp(15px, 2.2vw, 17px);
  font-weight: 400;
  line-height: 1.6;
  margin: 0 0 24px 0;
  color: var(--text);
  font-style: italic;
  position: relative;
  z-index: 2;
  letter-spacing: -0.01em;
  @media (max-width: 768px) {
    font-size: clamp(14px, 2.5vw, 16px);
    margin-bottom: 20px;
    line-height: 1.5;
  }
  @media (max-width: 480px) {
    font-size: clamp(13px, 3vw, 15px);
    margin-bottom: 16px;
  }
`;
const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
  z-index: 2;
  @media (max-width: 768px) {
    gap: 12px;
  }
  @media (max-width: 480px) {
    gap: 10px;
  }
`;
const AuthorAvatar = styled.div`
  flex-shrink: 0;
  .avatar-placeholder {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 700;
    color: white;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);
    transition: all 0.3s ease;
    &:hover {
      transform: scale(1.05);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
    }
  }
  @media (max-width: 768px) {
    .avatar-placeholder {
      width: 40px;
      height: 40px;
      font-size: 14px;
    }
  }
  @media (max-width: 480px) {
    .avatar-placeholder {
      width: 36px;
      height: 36px;
      font-size: 13px;
    }
  }
`;
const AuthorInfo = styled.div`
  flex: 1;
  min-width: 0;
`;
const AuthorName = styled.h4`
  font-size: clamp(14px, 2vw, 16px);
  font-weight: 700;
  line-height: 1.3;
  margin: 0 0 4px 0;
  color: var(--text);
  letter-spacing: -0.01em;
  @media (max-width: 768px) {
    font-size: clamp(13px, 2.5vw, 15px);
    margin-bottom: 3px;
  }
  @media (max-width: 480px) {
    font-size: clamp(12px, 3vw, 14px);
    margin-bottom: 2px;
  }
`;
const AuthorService = styled.div`
  font-size: clamp(12px, 1.8vw, 14px);
  font-weight: 600;
  color: #667eea;
  margin-bottom: 2px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  padding: 2px 8px;
  border-radius: 6px;
  display: inline-block;
  border: 1px solid rgba(102, 126, 234, 0.2);
  @media (max-width: 768px) {
    font-size: clamp(11px, 2.2vw, 13px);
    padding: 2px 6px;
    border-radius: 5px;
  }
  @media (max-width: 480px) {
    font-size: clamp(10px, 2.5vw, 12px);
    padding: 1px 5px;
    border-radius: 4px;
  }
`;
const AuthorTime = styled.div`
  font-size: clamp(11px, 1.6vw, 13px);
  font-weight: 400;
  color: var(--text-secondary);
  opacity: 0.7;
  @media (max-width: 768px) {
    font-size: clamp(10px, 2vw, 12px);
  }
  @media (max-width: 480px) {
    font-size: clamp(9px, 2.2vw, 11px);
  }
`;
const BannersContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 max(24px, env(safe-area-inset-left));
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 32px;
  @media (max-width: 768px) {
    padding: 0 20px;
    grid-template-columns: 1fr;
    gap: 24px;
  }
  @media (max-width: 480px) {
    padding: 0 16px;
    gap: 20px;
  }
`;
const BannerCard = styled.div`
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 16px;
  padding: 40px 32px;
  position: relative;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 40px;
  /* Premium glass effect */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
    border-radius: 32px;
    pointer-events: none;
    z-index: 1;
  }
  /* Primary banner styling */
  &.primary {
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%);
    border-color: rgba(102, 126, 234, 0.3);
    &::before {
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.12) 0%, rgba(118, 75, 162, 0.08) 100%);
    }
  }
  /* Secondary banner styling */
  &.secondary {
    background: linear-gradient(135deg, rgba(240, 147, 251, 0.08) 0%, rgba(102, 126, 234, 0.08) 100%);
    border-color: rgba(240, 147, 251, 0.3);
    &::before {
      background: linear-gradient(135deg, rgba(240, 147, 251, 0.12) 0%, rgba(102, 126, 234, 0.08) 100%);
    }
  }
  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 
      0 24px 80px rgba(0, 0, 0, 0.12),
      0 8px 32px rgba(0, 0, 0, 0.06);
    &.primary {
      border-color: rgba(102, 126, 234, 0.5);
    }
    &.secondary {
      border-color: rgba(240, 147, 251, 0.5);
    }
  }
  &:active {
    transform: translateY(-4px) scale(1.01);
  }
  @media (max-width: 768px) {
    padding: 40px 32px;
    border-radius: 24px;
    flex-direction: column;
    text-align: center;
    gap: 32px;
    &:hover {
      transform: translateY(-4px);
    }
  }
  @media (max-width: 480px) {
    padding: 32px 24px;
    border-radius: 20px;
    gap: 24px;
  }
`;
const BannerContent = styled.div`
  flex: 1;
  position: relative;
  z-index: 2;
  @media (max-width: 768px) {
    order: 1;
  }
`;
const BannerBadge = styled.div`
  display: inline-block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: clamp(12px, 1.8vw, 14px);
  font-weight: 700;
  padding: 8px 16px;
  border-radius: 20px;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);
  ${BannerCard}.secondary & {
    background: linear-gradient(135deg, #f093fb 0%, #667eea 100%);
    box-shadow: 0 4px 16px rgba(240, 147, 251, 0.3);
  }
  @media (max-width: 768px) {
    font-size: clamp(11px, 2.2vw, 13px);
    padding: 6px 14px;
    border-radius: 16px;
    margin-bottom: 16px;
  }
  @media (max-width: 480px) {
    font-size: clamp(10px, 2.5vw, 12px);
    padding: 5px 12px;
    border-radius: 14px;
    margin-bottom: 12px;
  }
`;
const BannerTitle = styled.h2`
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 800;
  line-height: 1.2;
  margin: 0 0 16px 0;
  color: var(--text);
  letter-spacing: -0.02em;
  .gradient-text {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
      border-radius: 1px;
      opacity: 0.3;
    }
  }
  @media (max-width: 768px) {
    font-size: clamp(24px, 5vw, 32px);
    margin-bottom: 12px;
  }
  @media (max-width: 480px) {
    font-size: clamp(20px, 6vw, 28px);
    margin-bottom: 10px;
  }
`;
const BannerDescription = styled.p`
  font-size: clamp(16px, 2.2vw, 18px);
  font-weight: 400;
  line-height: 1.6;
  margin: 0 0 32px 0;
  color: var(--text-secondary);
  opacity: 0.9;
  @media (max-width: 768px) {
    font-size: clamp(15px, 2.5vw, 17px);
    margin-bottom: 24px;
  }
  @media (max-width: 480px) {
    font-size: clamp(14px, 3vw, 16px);
    margin-bottom: 20px;
  }
`;
const BannerButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 16px;
  font-size: clamp(16px, 2.2vw, 18px);
  font-weight: 700;
  letter-spacing: -0.01em;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
  position: relative;
  overflow: hidden;
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
  &:hover {
    background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(102, 126, 234, 0.4);
    &::after {
      left: 100%;
    }
  }
  &:active {
    transform: translateY(0) scale(0.98);
    box-shadow: 0 6px 24px rgba(102, 126, 234, 0.3);
  }
  ${BannerCard}.secondary & {
    background: linear-gradient(135deg, #f093fb 0%, #667eea 100%);
    box-shadow: 0 8px 32px rgba(240, 147, 251, 0.3);
    &:hover {
      background: linear-gradient(135deg, #e085e8 0%, #5a6fd8 100%);
      box-shadow: 0 12px 40px rgba(240, 147, 251, 0.4);
    }
    &:active {
      box-shadow: 0 6px 24px rgba(240, 147, 251, 0.3);
    }
  }
  @media (max-width: 768px) {
    font-size: clamp(15px, 2.5vw, 17px);
    padding: 14px 28px;
    border-radius: 14px;
  }
  @media (max-width: 480px) {
    font-size: clamp(14px, 3vw, 16px);
    padding: 12px 24px;
    border-radius: 12px;
  }
`;
const BannerVisual = styled.div`
  flex-shrink: 0;
  position: relative;
  z-index: 2;
  .banner-icon {
    width: 120px;
    height: 120px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%);
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    svg {
      width: 48px;
      height: 48px;
      color: #667eea;
      filter: drop-shadow(0 2px 8px rgba(102, 126, 234, 0.3));
    }
    &:hover {
      transform: scale(1.05) rotate(5deg);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
      svg {
        color: #764ba2;
      }
    }
  }
  ${BannerCard}.secondary & .banner-icon {
    svg {
      color: #f093fb;
      filter: drop-shadow(0 2px 8px rgba(240, 147, 251, 0.3));
    }
    &:hover svg {
      color: #e085e8;
    }
  }
  @media (max-width: 768px) {
    order: 2;
    .banner-icon {
      width: 100px;
      height: 100px;
      border-radius: 24px;
      svg {
        width: 40px;
        height: 40px;
      }
    }
  }
  @media (max-width: 480px) {
    .banner-icon {
      width: 80px;
      height: 80px;
      border-radius: 20px;
      svg {
        width: 32px;
        height: 32px;
      }
    }
  }
`;
// Premium Media Coverage Section Styles
const MediaCoverageSection = styled.section`
  padding: 120px 0;
  background: #f8f9fa;
  position: relative;
  overflow: hidden;
  @media (max-width: 768px) {
    padding: 80px 0;
  }
  @media (max-width: 480px) {
    padding: 60px 0;
  }
`;
const MediaCoverageContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 max(24px, env(safe-area-inset-left));
  position: relative;
  z-index: 1;
  @media (max-width: 768px) {
    padding: 0 20px;
  }
  @media (max-width: 480px) {
    padding: 0 16px;
  }
`;
const MediaCoverageHeader = styled.div`
  text-align: center;
  margin-bottom: 80px;
  @media (max-width: 768px) {
    margin-bottom: 60px;
  }
  @media (max-width: 480px) {
    margin-bottom: 40px;
  }
`;
const MediaCoverageTitle = styled.h2`
  font-size: clamp(36px, 5vw, 56px);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin: 0 0 24px 0;
  color: var(--text);
  .gradient-text {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
      border-radius: 2px;
      opacity: 0.3;
    }
  }
  @media (max-width: 768px) {
    font-size: clamp(28px, 6vw, 42px);
    margin-bottom: 20px;
  }
  @media (max-width: 480px) {
    font-size: clamp(24px, 7vw, 36px);
    margin-bottom: 16px;
  }
`;
const MediaCoverageSubtitle = styled.p`
  font-size: clamp(16px, 2.5vw, 20px);
  font-weight: 400;
  line-height: 1.6;
  color: var(--text-secondary);
  max-width: 700px;
  margin: 0 auto;
  opacity: 0.9;
  @media (max-width: 768px) {
    font-size: clamp(15px, 3vw, 18px);
    max-width: 90%;
  }
  @media (max-width: 480px) {
    font-size: clamp(14px, 3.5vw, 16px);
    max-width: 95%;
  }
`;
const MediaCoverageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 32px;
  max-width: 1400px;
  margin: 0 auto;
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 24px;
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;
const MediaCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  padding: 0;
  position: relative;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.04),
    0 2px 8px rgba(0, 0, 0, 0.02);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  transform: rotate(-1deg);
  /* Premium glass effect */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
    border-radius: 24px;
    pointer-events: none;
    z-index: 1;
  }
  /* Featured card styling */
  &.featured {
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
    border-color: rgba(102, 126, 234, 0.2);
    transform: rotate(-0.5deg) scale(1.02);
    &::before {
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.05) 100%);
    }
  }
  &:hover {
    transform: rotate(0deg) translateY(-8px) scale(1.02);
    box-shadow: 
      0 20px 64px rgba(0, 0, 0, 0.08),
      0 8px 32px rgba(0, 0, 0, 0.04);
    border-color: rgba(102, 126, 234, 0.3);
    &.featured {
      transform: rotate(0deg) translateY(-8px) scale(1.04);
    }
  }
  &:active {
    transform: rotate(0deg) translateY(-4px) scale(1.01);
  }
  @media (max-width: 768px) {
    border-radius: 20px;
    transform: rotate(-0.5deg);
    &.featured {
      transform: rotate(-0.3deg);
    }
    &:hover {
      transform: rotate(0deg) translateY(-4px);
      &.featured {
        transform: rotate(0deg) translateY(-4px);
      }
    }
  }
  @media (max-width: 480px) {
    border-radius: 16px;
    transform: none;
    &.featured {
      transform: none;
    }
    &:hover {
      transform: translateY(-4px);
      &.featured {
        transform: translateY(-4px);
      }
    }
  }
`;
const MediaHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px 24px;
  position: relative;
  z-index: 2;
  ${MediaCard}.featured & {
    background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
  }
  @media (max-width: 768px) {
    padding: 16px 20px;
  }
  @media (max-width: 480px) {
    padding: 14px 16px;
  }
`;
const MediaMasthead = styled.h3`
  font-size: clamp(18px, 2.5vw, 22px);
  font-weight: 800;
  color: white;
  margin: 0 0 4px 0;
  letter-spacing: 0.5px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  @media (max-width: 768px) {
    font-size: clamp(16px, 3vw, 20px);
  }
  @media (max-width: 480px) {
    font-size: clamp(15px, 3.5vw, 18px);
  }
`;
const MediaEdition = styled.p`
  font-size: clamp(12px, 1.8vw, 14px);
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  @media (max-width: 768px) {
    font-size: clamp(11px, 2.2vw, 13px);
  }
  @media (max-width: 480px) {
    font-size: clamp(10px, 2.5vw, 12px);
  }
`;
const MediaContent = styled.div`
  padding: 32px 28px;
  position: relative;
  z-index: 2;
  @media (max-width: 768px) {
    padding: 28px 24px;
  }
  @media (max-width: 480px) {
    padding: 24px 20px;
  }
`;
const MediaHeadline = styled.h4`
  font-size: clamp(18px, 2.8vw, 24px);
  font-weight: 700;
  line-height: 1.3;
  margin: 0 0 20px 0;
  color: var(--text);
  letter-spacing: -0.01em;
  @media (max-width: 768px) {
    font-size: clamp(16px, 3.2vw, 22px);
    margin-bottom: 16px;
  }
  @media (max-width: 480px) {
    font-size: clamp(15px, 3.5vw, 20px);
    margin-bottom: 14px;
  }
`;
const MediaBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  @media (max-width: 768px) {
    gap: 14px;
  }
  @media (max-width: 480px) {
    gap: 12px;
  }
`;
const MediaParagraph = styled.p`
  font-size: clamp(14px, 2vw, 16px);
  font-weight: 400;
  line-height: 1.6;
  margin: 0;
  color: var(--text-secondary);
  text-align: justify;
  @media (max-width: 768px) {
    font-size: clamp(13px, 2.2vw, 15px);
    line-height: 1.5;
  }
  @media (max-width: 480px) {
    font-size: clamp(12px, 2.5vw, 14px);
  }
`;
const MediaQuote = styled.blockquote`
  font-size: clamp(15px, 2.2vw, 17px);
  font-weight: 500;
  line-height: 1.6;
  margin: 0;
  color: var(--text);
  font-style: italic;
  padding: 16px 20px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
  border-left: 4px solid #667eea;
  border-radius: 8px;
  position: relative;
  &::before {
    content: '"';
    position: absolute;
    top: -8px;
    left: 12px;
    font-size: 32px;
    color: #667eea;
    font-family: 'Georgia', serif;
    line-height: 1;
  }
  @media (max-width: 768px) {
    font-size: clamp(14px, 2.5vw, 16px);
    padding: 14px 18px;
    border-radius: 6px;
    &::before {
      font-size: 28px;
      top: -6px;
      left: 10px;
    }
  }
  @media (max-width: 480px) {
    font-size: clamp(13px, 3vw, 15px);
    padding: 12px 16px;
    border-radius: 5px;
    &::before {
      font-size: 24px;
      top: -4px;
      left: 8px;
    }
  }
`;
// Premium How Does It Works Section Styles
const HowItWorksSection = styled.section`
  padding: 120px 0;
  background: #f8f9fa;
  position: relative;
  overflow: hidden;
  @media (max-width: 768px) {
    padding: 80px 0;
  }
  @media (max-width: 480px) {
    padding: 60px 0;
  }
`;
const HowItWorksContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 max(24px, env(safe-area-inset-left));
  position: relative;
  z-index: 1;
  @media (max-width: 768px) {
    padding: 0 20px;
  }
  @media (max-width: 480px) {
    padding: 0 16px;
  }
`;
const HowItWorksHeader = styled.div`
  text-align: center;
  margin-bottom: 80px;
  @media (max-width: 768px) {
    margin-bottom: 60px;
  }
  @media (max-width: 480px) {
    margin-bottom: 40px;
  }
`;
const HowItWorksTitle = styled.h2`
  font-size: clamp(36px, 5vw, 56px);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin: 0 0 24px 0;
  color: var(--text);
  .gradient-text {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
      border-radius: 2px;
      opacity: 0.3;
    }
  }
  @media (max-width: 768px) {
    font-size: clamp(28px, 6vw, 42px);
    margin-bottom: 20px;
  }
  @media (max-width: 480px) {
    font-size: clamp(24px, 7vw, 36px);
    margin-bottom: 16px;
  }
`;
const HowItWorksSubtitle = styled.p`
  font-size: clamp(16px, 2.5vw, 20px);
  font-weight: 400;
  line-height: 1.6;
  color: var(--text-secondary);
  max-width: 700px;
  margin: 0 auto;
  opacity: 0.9;
  @media (max-width: 768px) {
    font-size: clamp(15px, 3vw, 18px);
    max-width: 90%;
  }
  @media (max-width: 480px) {
    font-size: clamp(14px, 3.5vw, 16px);
    max-width: 95%;
  }
`;
const HowItWorksSteps = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  /* Connecting lines between steps */
  &::before {
    content: '';
    position: absolute;
    top: 60px;
    left: 15%;
    right: 15%;
    height: 2px;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    opacity: 0.3;
    z-index: 0;
    @media (max-width: 768px) {
      display: none;
    }
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const HowItWorksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 24px;
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const HowItWorksStep = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  padding: 40px 32px;
  position: relative;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  text-align: center;
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
  }
  @media (max-width: 768px) {
    padding: 32px 24px;
  }
  @media (max-width: 480px) {
    padding: 24px 20px;
  }
`;

const HowItWorksStepNumber = styled.div`
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 16px;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);
  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    font-size: 14px;
  }
`;

const HowItWorksStepIcon = styled.div`
  font-size: 48px;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    font-size: 40px;
    margin-bottom: 16px;
  }
`;

const HowItWorksStepTitle = styled.h3`
  font-size: clamp(20px, 2.5vw, 24px);
  font-weight: 700;
  color: #1D1D1F;
  margin-bottom: 16px;
  font-family: 'Playfair Display', serif;
  @media (max-width: 768px) {
    font-size: clamp(18px, 2.8vw, 22px);
    margin-bottom: 12px;
  }
`;

const HowItWorksStepDescription = styled.p`
  font-size: clamp(14px, 1.8vw, 16px);
  color: #666;
  line-height: 1.6;
  margin: 0;
  @media (max-width: 768px) {
    font-size: clamp(13px, 2vw, 15px);
  }
`;

const StepCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  padding: 40px 32px;
  position: relative;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.04),
    0 2px 8px rgba(0, 0, 0, 0.02);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  text-align: center;
  z-index: 1;
  /* Premium glass effect */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
    border-radius: 24px;
    pointer-events: none;
    z-index: 1;
  }
  /* Step-specific styling */
  &.step-1 {
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
    border-color: rgba(102, 126, 234, 0.2);
    &::before {
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.05) 100%);
    }
  }
  &.step-2 {
    background: linear-gradient(135deg, rgba(240, 147, 251, 0.05) 0%, rgba(102, 126, 234, 0.05) 100%);
    border-color: rgba(240, 147, 251, 0.2);
    &::before {
      background: linear-gradient(135deg, rgba(240, 147, 251, 0.08) 0%, rgba(102, 126, 234, 0.05) 100%);
    }
  }
  &.step-3 {
    background: linear-gradient(135deg, rgba(118, 75, 162, 0.05) 0%, rgba(240, 147, 251, 0.05) 100%);
    border-color: rgba(118, 75, 162, 0.2);
    &::before {
      background: linear-gradient(135deg, rgba(118, 75, 162, 0.08) 0%, rgba(240, 147, 251, 0.05) 100%);
    }
  }
  &.step-4 {
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(240, 147, 251, 0.05) 100%);
    border-color: rgba(102, 126, 234, 0.2);
    &::before {
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(240, 147, 251, 0.05) 100%);
    }
  }
  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 
      0 20px 64px rgba(0, 0, 0, 0.08),
      0 8px 32px rgba(0, 0, 0, 0.04);
    &.step-1 {
      border-color: rgba(102, 126, 234, 0.4);
    }
    &.step-2 {
      border-color: rgba(240, 147, 251, 0.4);
    }
    &.step-3 {
      border-color: rgba(118, 75, 162, 0.4);
    }
    &.step-4 {
      border-color: rgba(102, 126, 234, 0.4);
    }
  }
  &:active {
    transform: translateY(-4px) scale(1.01);
  }
  @media (max-width: 768px) {
    padding: 32px 24px;
    border-radius: 20px;
    &:hover {
      transform: translateY(-4px);
    }
  }
  @media (max-width: 480px) {
    padding: 28px 20px;
    border-radius: 16px;
  }
`;
const StepNumber = styled.div`
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 800;
  color: white;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);
  z-index: 3;
  ${StepCard}.step-2 & {
    background: linear-gradient(135deg, #f093fb 0%, #667eea 100%);
    box-shadow: 0 4px 16px rgba(240, 147, 251, 0.3);
  }
  ${StepCard}.step-3 & {
    background: linear-gradient(135deg, #764ba2 0%, #f093fb 100%);
    box-shadow: 0 4px 16px rgba(118, 75, 162, 0.3);
  }
  ${StepCard}.step-4 & {
    background: linear-gradient(135deg, #667eea 0%, #f093fb 100%);
    box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);
  }
  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    font-size: 16px;
    top: -18px;
  }
  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
    font-size: 14px;
    top: -16px;
  }
`;
const StepIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px auto;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
  svg {
    width: 32px;
    height: 32px;
    color: #667eea;
    filter: drop-shadow(0 2px 8px rgba(102, 126, 234, 0.3));
  }
  ${StepCard}.step-2 & {
    svg {
      color: #f093fb;
      filter: drop-shadow(0 2px 8px rgba(240, 147, 251, 0.3));
    }
  }
  ${StepCard}.step-3 & {
    svg {
      color: #764ba2;
      filter: drop-shadow(0 2px 8px rgba(118, 75, 162, 0.3));
    }
  }
  ${StepCard}.step-4 & {
    svg {
      color: #667eea;
      filter: drop-shadow(0 2px 8px rgba(102, 126, 234, 0.3));
    }
  }
  &:hover {
    transform: scale(1.05) rotate(5deg);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
    border-radius: 18px;
    margin-bottom: 20px;
    svg {
      width: 28px;
      height: 28px;
    }
  }
  @media (max-width: 480px) {
    width: 60px;
    height: 60px;
    border-radius: 16px;
    margin-bottom: 16px;
    svg {
      width: 24px;
      height: 24px;
    }
  }
`;
const StepContent = styled.div`
  position: relative;
  z-index: 2;
`;
const StepTitle = styled.h3`
  font-size: clamp(20px, 3vw, 24px);
  font-weight: 700;
  line-height: 1.3;
  margin: 0 0 12px 0;
  color: var(--text);
  letter-spacing: -0.01em;
  @media (max-width: 768px) {
    font-size: clamp(18px, 3.5vw, 22px);
    margin-bottom: 10px;
  }
  @media (max-width: 480px) {
    font-size: clamp(16px, 4vw, 20px);
    margin-bottom: 8px;
  }
`;
const StepDescription = styled.p`
  font-size: clamp(14px, 2vw, 16px);
  font-weight: 400;
  line-height: 1.6;
  margin: 0;
  color: var(--text-secondary);
  opacity: 0.9;
  @media (max-width: 768px) {
    font-size: clamp(13px, 2.2vw, 15px);
    line-height: 1.5;
  }
  @media (max-width: 480px) {
    font-size: clamp(12px, 2.5vw, 14px);
  }
`;
// Premium Download Our App Section Styles
const DownloadAppSection = styled.section`
  padding: 120px 0;
  background: #f8f9fa;
  position: relative;
  overflow: hidden;
  @media (max-width: 768px) {
    padding: 80px 0;
  }
  @media (max-width: 480px) {
    padding: 60px 0;
  }
`;
const DownloadAppContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 max(24px, env(safe-area-inset-left));
  position: relative;
  z-index: 1;
  @media (max-width: 768px) {
    padding: 0 20px;
  }
  @media (max-width: 480px) {
    padding: 0 16px;
  }
`;
const DownloadAppContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 60px;
    text-align: center;
  }
  @media (max-width: 480px) {
    gap: 40px;
  }
`;
const DownloadAppText = styled.div`
  @media (max-width: 768px) {
    order: 2;
  }
`;
const DownloadAppBadge = styled.div`
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: clamp(12px, 1.8vw, 14px);
  font-weight: 700;
  padding: 8px 16px;
  border-radius: 20px;
  margin-bottom: 24px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  @media (max-width: 768px) {
    font-size: clamp(11px, 2.2vw, 13px);
    padding: 6px 14px;
    border-radius: 16px;
    margin-bottom: 20px;
  }
  @media (max-width: 480px) {
    font-size: clamp(10px, 2.5vw, 12px);
    padding: 5px 12px;
    border-radius: 14px;
    margin-bottom: 16px;
  }
`;
const DownloadAppTitle = styled.h2`
  font-size: clamp(36px, 5vw, 56px);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin: 0 0 24px 0;
  color: white;
  .gradient-text {
    background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 50%, #e0e0e0 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 50%, #e0e0e0 100%);
      border-radius: 2px;
      opacity: 0.3;
    }
  }
  @media (max-width: 768px) {
    font-size: clamp(28px, 6vw, 42px);
    margin-bottom: 20px;
  }
  @media (max-width: 480px) {
    font-size: clamp(24px, 7vw, 36px);
    margin-bottom: 16px;
  }
`;
const DownloadAppDescription = styled.p`
  font-size: clamp(16px, 2.5vw, 20px);
  font-weight: 400;
  line-height: 1.6;
  margin: 0 0 40px 0;
  color: rgba(255, 255, 255, 0.9);
  @media (max-width: 768px) {
    font-size: clamp(15px, 3vw, 18px);
    margin-bottom: 32px;
  }
  @media (max-width: 480px) {
    font-size: clamp(14px, 3.5vw, 16px);
    margin-bottom: 24px;
  }
`;
const DownloadAppFeatures = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 40px;
  @media (max-width: 768px) {
    gap: 14px;
    margin-bottom: 32px;
  }
  @media (max-width: 480px) {
    gap: 12px;
    margin-bottom: 24px;
  }
`;
const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  @media (max-width: 768px) {
    justify-content: center;
    gap: 12px;
  }
  @media (max-width: 480px) {
    gap: 10px;
  }
`;
const FeatureIcon = styled.div`
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  svg {
    width: 20px;
    height: 20px;
    color: white;
  }
  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    svg {
      width: 18px;
      height: 18px;
    }
  }
  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    svg {
      width: 16px;
      height: 16px;
    }
  }
`;
const FeatureText = styled.span`
  font-size: clamp(16px, 2.2vw, 18px);
  font-weight: 600;
  color: white;
  @media (max-width: 768px) {
    font-size: clamp(15px, 2.5vw, 17px);
  }
  @media (max-width: 480px) {
    font-size: clamp(14px, 3vw, 16px);
  }
`;
const DownloadAppButtons = styled.div`
  display: flex;
  gap: 20px;
  @media (max-width: 768px) {
    justify-content: center;
    gap: 16px;
  }
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 12px;
  }
`;
const DownloadButton = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.95);
  color: #333;
  text-decoration: none;
  padding: 16px 24px;
  border-radius: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
  &:active {
    transform: translateY(0) scale(0.98);
  }
  @media (max-width: 768px) {
    padding: 14px 20px;
    border-radius: 14px;
  }
  @media (max-width: 480px) {
    padding: 12px 16px;
    border-radius: 12px;
    justify-content: center;
  }
`;
const DownloadButtonIcon = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 24px;
    height: 24px;
    color: #333;
  }
  @media (max-width: 768px) {
    width: 28px;
    height: 28px;
    svg {
      width: 20px;
      height: 20px;
    }
  }
  @media (max-width: 480px) {
    width: 24px;
    height: 24px;
    svg {
      width: 18px;
      height: 18px;
    }
  }
`;
const DownloadButtonText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @media (max-width: 480px) {
    align-items: center;
  }
`;
const DownloadButtonLabel = styled.div`
  font-size: clamp(11px, 1.6vw, 12px);
  font-weight: 500;
  color: #666;
  line-height: 1;
  @media (max-width: 768px) {
    font-size: clamp(10px, 2vw, 11px);
  }
  @media (max-width: 480px) {
    font-size: clamp(9px, 2.2vw, 10px);
  }
`;
const DownloadButtonStore = styled.div`
  font-size: clamp(16px, 2.2vw, 18px);
  font-weight: 700;
  color: #333;
  line-height: 1;
  @media (max-width: 768px) {
    font-size: clamp(15px, 2.5vw, 17px);
  }
  @media (max-width: 480px) {
    font-size: clamp(14px, 3vw, 16px);
  }
`;
const DownloadAppVisual = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    order: 1;
  }
`;

const DownloadAppSubtitle = styled.p`
  font-size: clamp(16px, 2vw, 18px);
  color: #666;
  line-height: 1.6;
  margin: 0 0 32px 0;
  max-width: 500px;
  @media (max-width: 768px) {
    font-size: clamp(15px, 2.2vw, 17px);
    margin-bottom: 24px;
  }
`;

const DownloadAppFeature = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  @media (max-width: 768px) {
    margin-bottom: 12px;
  }
`;

const DownloadAppFeatureIcon = styled.span`
  font-size: 24px;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const DownloadAppFeatureText = styled.span`
  font-size: clamp(14px, 1.8vw, 16px);
  color: #333;
  font-weight: 500;
  @media (max-width: 768px) {
    font-size: clamp(13px, 2vw, 15px);
  }
`;

const DownloadAppButton = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  background: #000;
  color: white;
  padding: 12px 20px;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }
  &.google-play {
    background: #01875f;
  }
  @media (max-width: 768px) {
    padding: 10px 16px;
    gap: 10px;
  }
`;

const DownloadAppButtonIcon = styled.span`
  font-size: 24px;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const DownloadAppButtonText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const DownloadAppButtonLabel = styled.span`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1;
  @media (max-width: 768px) {
    font-size: 11px;
  }
`;

const DownloadAppButtonStore = styled.span`
  font-size: 16px;
  font-weight: 600;
  line-height: 1;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const DownloadAppPhone = styled.div`
  width: 280px;
  height: 560px;
  background: #1a1a1a;
  border-radius: 40px;
  padding: 8px;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.3),
    0 8px 32px rgba(0, 0, 0, 0.2);
  position: relative;
  @media (max-width: 768px) {
    width: 240px;
    height: 480px;
  }
`;

const DownloadAppPhoneImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 32px;
`;

const PhoneMockup = styled.div`
  width: 280px;
  height: 560px;
  background: #1a1a1a;
  border-radius: 40px;
  padding: 8px;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.3),
    0 8px 32px rgba(0, 0, 0, 0.2);
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(240, 147, 251, 0.1) 100%);
    border-radius: 40px;
    pointer-events: none;
  }
  @media (max-width: 768px) {
    width: 240px;
    height: 480px;
    border-radius: 32px;
    padding: 6px;
    &::before {
      border-radius: 32px;
    }
  }
  @media (max-width: 480px) {
    width: 200px;
    height: 400px;
    border-radius: 28px;
    padding: 4px;
    &::before {
      border-radius: 28px;
    }
  }
`;
const PhoneScreen = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  border-radius: 32px;
  overflow: hidden;
  position: relative;
  @media (max-width: 768px) {
    border-radius: 26px;
  }
  @media (max-width: 480px) {
    border-radius: 24px;
  }
`;
const PhoneHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px 16px 24px;
  position: relative;
  @media (max-width: 768px) {
    padding: 16px 20px 12px 20px;
  }
  @media (max-width: 480px) {
    padding: 12px 16px 8px 16px;
  }
`;
const PhoneNotch = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 24px;
  background: #1a1a1a;
  border-radius: 0 0 12px 12px;
  @media (max-width: 768px) {
    width: 100px;
    height: 20px;
    border-radius: 0 0 10px 10px;
  }
  @media (max-width: 480px) {
    width: 80px;
    height: 16px;
    border-radius: 0 0 8px 8px;
  }
`;
const PhoneTime = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: white;
  @media (max-width: 768px) {
    font-size: 14px;
  }
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;
const PhoneBattery = styled.div`
  width: 24px;
  height: 12px;
  border: 2px solid white;
  border-radius: 2px;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    right: -4px;
    top: 2px;
    width: 2px;
    height: 6px;
    background: white;
    border-radius: 0 1px 1px 0;
  }
  @media (max-width: 768px) {
    width: 20px;
    height: 10px;
    &::after {
      right: -3px;
      top: 1px;
      width: 2px;
      height: 5px;
    }
  }
  @media (max-width: 480px) {
    width: 18px;
    height: 8px;
    &::after {
      right: -3px;
      top: 1px;
      width: 1px;
      height: 4px;
    }
  }
`;
const PhoneBatteryLevel = styled.div`
  width: 80%;
  height: 100%;
  background: white;
  border-radius: 1px;
`;
const PhoneContent = styled.div`
  padding: 40px 24px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  @media (max-width: 768px) {
    padding: 32px 20px;
    gap: 20px;
  }
  @media (max-width: 480px) {
    padding: 24px 16px;
    gap: 16px;
  }
`;
const PhoneAppIcon = styled.div`
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  svg {
    width: 40px;
    height: 40px;
    color: white;
  }
  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
    border-radius: 18px;
    svg {
      width: 35px;
      height: 35px;
    }
  }
  @media (max-width: 480px) {
    width: 60px;
    height: 60px;
    border-radius: 16px;
    svg {
      width: 30px;
      height: 30px;
    }
  }
`;
const PhoneAppTitle = styled.h3`
  font-size: 28px;
  font-weight: 800;
  color: white;
  margin: 0;
  letter-spacing: -0.01em;
  @media (max-width: 768px) {
    font-size: 24px;
  }
  @media (max-width: 480px) {
    font-size: 20px;
  }
`;
const PhoneAppSubtitle = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  @media (max-width: 768px) {
    font-size: 14px;
  }
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;
const PhoneFeatures = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  @media (max-width: 768px) {
    gap: 10px;
  }
  @media (max-width: 480px) {
    gap: 8px;
  }
`;
const PhoneFeature = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  color: white;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  @media (max-width: 768px) {
    padding: 10px 14px;
    border-radius: 10px;
    font-size: 13px;
  }
  @media (max-width: 480px) {
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 12px;
  }
`;
// Premium Footer Section Styles
const FooterSection = styled.footer`
  background: #1a1a1a;
  color: white;
  position: relative;
  overflow: hidden;
`;
const FooterContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 80px max(24px, env(safe-area-inset-left)) 40px;
  position: relative;
  z-index: 1;
  @media (max-width: 768px) {
    padding: 60px 20px 30px;
  }
  @media (max-width: 480px) {
    padding: 40px 16px 20px;
  }
`;
const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
  margin-bottom: 60px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
    margin-bottom: 40px;
  }
  @media (max-width: 480px) {
    gap: 30px;
    margin-bottom: 30px;
  }
`;
const FooterBrand = styled.div`
  @media (max-width: 768px) {
    text-align: center;
  }
`;
const FooterLogo = styled.div`
  margin-bottom: 24px;
  img {
    height: 48px;
    width: auto;
    filter: brightness(0) invert(1);
  }
  @media (max-width: 768px) {
    margin-bottom: 20px;
    img {
      height: 40px;
    }
  }
  @media (max-width: 480px) {
    margin-bottom: 16px;
    img {
      height: 36px;
    }
  }
`;
const FooterDescription = styled.p`
  font-size: clamp(15px, 2vw, 16px);
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 32px 0;
  max-width: 400px;
  @media (max-width: 768px) {
    max-width: 100%;
    margin-bottom: 24px;
  }
  @media (max-width: 480px) {
    font-size: clamp(14px, 2.5vw, 15px);
    margin-bottom: 20px;
  }
`;
const FooterSocial = styled.div`
  display: flex;
  gap: 16px;
  @media (max-width: 768px) {
    justify-content: center;
  }
  @media (max-width: 480px) {
    gap: 12px;
  }
`;
const SocialLink = styled.a`
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  svg {
    width: 20px;
    height: 20px;
  }
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }
  &:active {
    transform: translateY(0) scale(0.95);
  }
  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    svg {
      width: 18px;
      height: 18px;
    }
  }
`;
const FooterLinks = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;
const FooterColumn = styled.div`
  @media (max-width: 480px) {
    text-align: center;
  }
`;
const FooterTitle = styled.h3`
  font-size: clamp(16px, 2.2vw, 18px);
  font-weight: 700;
  color: white;
  margin: 0 0 20px 0;
  letter-spacing: -0.01em;
  @media (max-width: 768px) {
    font-size: clamp(15px, 2.5vw, 17px);
    margin-bottom: 16px;
  }
  @media (max-width: 480px) {
    font-size: clamp(14px, 3vw, 16px);
    margin-bottom: 12px;
  }
`;
const FooterLink = styled.a`
  display: block;
  font-size: clamp(14px, 2vw, 15px);
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  margin-bottom: 12px;
  transition: all 0.2s ease;
  &:hover {
    color: white;
    transform: translateX(4px);
  }
  @media (max-width: 768px) {
    font-size: clamp(13px, 2.2vw, 14px);
    margin-bottom: 10px;
  }
  @media (max-width: 480px) {
    font-size: clamp(12px, 2.5vw, 13px);
    margin-bottom: 8px;
    &:hover {
      transform: none;
    }
  }
`;
const FooterContact = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  @media (max-width: 480px) {
    gap: 12px;
  }
`;
const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  @media (max-width: 480px) {
    justify-content: center;
    gap: 10px;
  }
`;
const ContactIcon = styled.div`
  width: 20px;
  height: 20px;
  color: rgba(255, 255, 255, 0.6);
  flex-shrink: 0;
  svg {
    width: 100%;
    height: 100%;
  }
  @media (max-width: 480px) {
    width: 18px;
    height: 18px;
  }
`;
const ContactText = styled.span`
  font-size: clamp(14px, 2vw, 15px);
  color: rgba(255, 255, 255, 0.8);
  @media (max-width: 768px) {
    font-size: clamp(13px, 2.2vw, 14px);
  }
  @media (max-width: 480px) {
    font-size: clamp(12px, 2.5vw, 13px);
  }
`;
const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 24px;
    padding-top: 30px;
  }
  @media (max-width: 480px) {
    gap: 20px;
    padding-top: 24px;
  }
`;
const FooterCopyright = styled.p`
  font-size: clamp(13px, 1.8vw, 14px);
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
  @media (max-width: 768px) {
    text-align: center;
    font-size: clamp(12px, 2vw, 13px);
  }
  @media (max-width: 480px) {
    font-size: clamp(11px, 2.2vw, 12px);
  }
`;
const FooterBadges = styled.div`
  display: flex;
  gap: 20px;
  @media (max-width: 768px) {
    gap: 16px;
  }
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 12px;
    width: 100%;
  }
`;
const FooterBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 8px 12px;
  border-radius: 8px;
  font-size: clamp(12px, 1.6vw, 13px);
  color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  svg {
    width: 16px;
    height: 16px;
    color: #667eea;
  }
  @media (max-width: 768px) {
    font-size: clamp(11px, 1.8vw, 12px);
    padding: 6px 10px;
    svg {
      width: 14px;
      height: 14px;
    }
  }
  @media (max-width: 480px) {
    justify-content: center;
    font-size: clamp(10px, 2vw, 11px);
    padding: 6px 8px;
    svg {
      width: 12px;
      height: 12px;
    }
  }
`;

const FooterTrust = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
  @media (max-width: 768px) {
    gap: 8px;
  }
`;

const FooterTrustBadge = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 6px 10px;
  border-radius: 6px;
  font-size: clamp(11px, 1.4vw, 12px);
  color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  @media (max-width: 768px) {
    font-size: clamp(10px, 1.6vw, 11px);
    padding: 4px 8px;
  }
`;

const FooterContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-size: clamp(14px, 1.8vw, 16px);
  color: rgba(255, 255, 255, 0.8);
  &:last-child {
    margin-bottom: 0;
  }
  @media (max-width: 768px) {
    font-size: clamp(13px, 2vw, 15px);
    margin-bottom: 10px;
  }
`;

const FooterSocialLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 18px;
  transition: all 0.3s ease;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  }
  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    font-size: 16px;
  }
`;

// Shortcuts legacy styled components removed

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
// Premium Banners Section with inline styles
const bannersData = [
  {
    id: 1,
    type: 'promo',
    title: '50% OFF Your First Booking',
    description: 'Experience our premium beauty services at an unbeatable price. Book now and transform your look with our expert team.',
    cta: 'Book Now',
    bgImage: "https://source.unsplash.com/600x400/?beauty,serene,abstract",
    action: 'booking'
  },
  {
    id: 2,
    type: 'service',
    title: 'Hydra Facial Treatments',
    description: 'Have questions about our revolutionary Hydra Facial treatments? Get expert consultation and personalized care.',
    cta: 'Request Call Back',
    bgImage: "https://source.unsplash.com/600x400/?facial,hydration,glow",
    action: 'consult'
  }
];
const BannersSection = () => {
  const [hoveredBanner, setHoveredBanner] = useState(null);
  const handleAction = (action) => {
    console.log(`Open ${action} modal`);
  };
  return (
    <section style={{
      position: 'relative',
      padding: '5rem 1rem',
      background: 'linear-gradient(135deg, #E8D5E8 0%, #EDE4D9 50%, rgba(212, 175, 55, 0.2) 100%)',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.1,
        background: 'linear-gradient(45deg, #E8D5E8 0%, #EDE4D9 50%, #D4AF37 100%)',
        animation: 'pulse 12s ease-in-out infinite'
      }} />
      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '75rem',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {bannersData.map((banner, index) => (
            <div
              key={banner.id}
              style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '1rem',
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                transition: 'all 0.7s ease',
                transform: hoveredBanner === banner.id ? 'translateY(-10px)' : 'translateY(0)',
                padding: '2rem'
              }}
              onMouseEnter={() => setHoveredBanner(banner.id)}
              onMouseLeave={() => setHoveredBanner(null)}
              onClick={() => handleAction(banner.action)}
            >
              {/* Background image with overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.2,
                backgroundImage: `url(${banner.bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'opacity 0.7s ease'
              }} />
              <div style={{
                position: 'relative',
                zIndex: 10,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                {/* Badge */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '0.5rem 1rem',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  background: banner.type === 'promo' ? '#D4AF37' : '#E8D5E8',
                  color: banner.type === 'promo' ? 'white' : '#2A4A3A',
                  marginBottom: '1rem'
                }}>
                  ✨ {banner.type === 'promo' ? 'Limited Time Offer' : 'New Service'}   
                </div>
                {/* Content */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h3 style={{
                    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                    fontFamily: 'Playfair Display, serif',
                    fontWeight: 600,
                    color: '#2A4A3A',
                    marginBottom: '1rem',
                    lineHeight: 1.2
                  }}>
                    {banner.title}
                  </h3>
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#6B7280',
                    marginBottom: '1.5rem',
                    lineHeight: 1.6
                  }}>
                    {banner.description}
                  </p>
                </div>
                {/* CTA Button */}
                <button style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '0.75rem',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  fontFamily: 'system-ui',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  background: banner.type === 'promo' ? '#D4AF37' : '#E8D5E8',
                  color: banner.type === 'promo' ? 'white' : '#2A4A3A',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = banner.type === 'promo' ? '#C9A96E' : '#D4AF37';
                  e.target.style.transform = 'scale(1.02)';
                  if (banner.type !== 'promo') {
                    e.target.style.color = 'white';
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = banner.type === 'promo' ? '#D4AF37' : '#E8D5E8';
                  e.target.style.transform = 'scale(1)';
                  e.target.style.color = banner.type === 'promo' ? 'white' : '#2A4A3A';
                }}
                >
                  {banner.cta}
                  <span style={{
                    transition: 'Transform 0.3s ease',
                    transform: hoveredBanner === banner.id ? 'translateX(4px)' : 'translateX(0)'
                  }}>
                    →
                  </span>
                </button>
              </div>
              {/* Hover shimmer effect */}
              {hoveredBanner === banner.id && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                  animation: 'slideRight 1s ease-in-out'
                }} />
              )}
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes slideRight {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
};

// New Benefits Section (legacy) — will not be used now but kept above for future reuse
const BenefitsSectionWrap = styled.section`
  position: relative;
  padding: 96px 16px;
  background: linear-gradient(180deg, #f7f2fb 0%, #faf5ef 100%);
`;

const BenefitsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(6, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const BenefitCard = styled.div`
  background: #ffffff;
  border: 1px solid var(--border-light);
  border-radius: 24px;
  box-shadow: 0 6px 24px rgba(0,0,0,0.06);
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 220px;
`;

const CardHeadline = styled.h3`
  margin: 0;
  font-size: clamp(18px, 2.4vw, 24px);
  line-height: 1.2;
  color: #111827;
`;

const CardBody = styled.p`
  margin: 0;
  color: #4b5563;
  font-size: 14px;
  line-height: 1.6;
`;

const Illustration = styled.div`
  flex: 1;
  border-radius: 16px;
  background: #f4f6f8;
  border: 1px dashed #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  font-size: 14px;
`;

const MiniCard = styled.div`
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 12px 14px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 14px rgba(0,0,0,0.06);
`;

const BenefitsSection = () => {
  return (
    <BenefitsSectionWrap>
      <BenefitsContainer>
        <BenefitsGrid>
          {/* Top row - two wide cards */}
          <BenefitCard style={{ gridColumn: 'span 6' }}>
            <Illustration style={{ height: 160 }}>
              Browser Mockup Placeholder
            </Illustration>
            <CardHeadline>Beauty services live in your browser</CardHeadline>
            <CardBody>
              Book premium at-home salon services from any device—Saundarya meets you wherever you browse.
            </CardBody>
          </BenefitCard>
          <BenefitCard style={{ gridColumn: 'span 6', position: 'relative' }}>
            <CardHeadline>Automatically find offers and apply coupons</CardHeadline>
            <CardBody>
              We surface the best applicable promos at checkout so you always get the best value.
            </CardBody>
            <div style={{ marginTop: '8px' }}>
              <MiniCard>
                <span style={{ fontWeight: 700 }}>Saundarya</span>
                <span style={{ color: '#6b7280', fontSize: 12 }}>Promo code</span>
                <span style={{ marginLeft: 'auto', fontWeight: 600, color: '#7c3aed' }}>APPLY</span>
              </MiniCard>
            </div>
          </BenefitCard>

          {/* Bottom row - three equal cards */}
          <BenefitCard style={{ gridColumn: 'span 4' }}>
            <CardHeadline>Finds and compares the best packages</CardHeadline>
            <CardBody>
              Instantly compare prices across services and timings to choose what suits you best.
            </CardBody>
            <Illustration style={{ height: 120 }}>Deal Cards Placeholder</Illustration>
          </BenefitCard>
          <BenefitCard style={{ gridColumn: 'span 4' }}>
            <CardHeadline>Helps you plan your next appointment</CardHeadline>
            <CardBody>
              Save treatments to your list and schedule when it's convenient—without losing track.
            </CardBody>
            <Illustration style={{ height: 120 }}>Saved Item Placeholder</Illustration>
          </BenefitCard>
          <BenefitCard style={{ gridColumn: 'span 4' }}>
            <CardHeadline>Book at the right time</CardHeadline>
            <CardBody>
              Get alerts for limited-time offers and slots so you book at the perfect moment.
            </CardBody>
            <Illustration style={{ height: 120 }}>Price Drop Badge Placeholder</Illustration>
          </BenefitCard>
        </BenefitsGrid>
      </BenefitsContainer>
    </BenefitsSectionWrap>
  );
};

// Services Section (premium UrbanCompany-like)
const SvcSectionWrap = styled.section`
  padding: 96px 16px;
  background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
`;
const SvcContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const SvcHeader = styled.div`
  text-align: center;
  margin-bottom: 32px;
`;
const SvcTitle = styled.h2`
  margin: 0 0 8px 0;
  font-size: clamp(28px, 4vw, 44px);
  background: linear-gradient(90deg, #2A4A3A, #D4AF37);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
const SvcSub = styled.p`
  margin: 0;
  font-size: 16px;
  color: #6b7280;
`;
const SvcGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
  @media (max-width: 1024px){ grid-template-columns: repeat(8,1fr); }
  @media (max-width: 768px){ grid-template-columns: repeat(4,1fr); }
`;
const SvcCard = styled.a`
  grid-column: span 3;
  display: grid;
  background: #ffffff;
  border: 1px solid #eef0f3;
  border-radius: 20px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: transform .18s ease, box-shadow .18s ease;
  box-shadow: 0 8px 20px rgba(0,0,0,.06);
  &:hover{ transform: translateY(-4px); box-shadow: 0 18px 44px rgba(0,0,0,.10); }
  position: relative;
  isolation: isolate;
`;
const SvcImg = styled.div`
  height: 180px;
  background: #f3f4f6;
  position: relative;
  overflow: hidden;
`;
const SvcBody = styled.div`
  padding: 18px 18px 22px;
  display: grid;
  gap: 8px;
`;
const SvcItemTitle = styled.h4`
  margin: 0;
  font-size: 18px;
`;
const SvcDesc = styled.p`
  margin: 0;
  color: #6b7280;
  font-size: 14px;
  line-height: 1.6;
`;

// Mobile persistent CTA for accessibility (no hover on touch)
const SvcMobileCTA = styled.a`
  display: none;
  margin: 12px 18px 18px;
  background: #111827;
  color: #fff;
  text-align: center;
  padding: 10px 14px;
  border-radius: 12px;
  font-weight: 600;
  @media (max-width: 768px){ display: block; }
`;

// CTA overlay
const SvcOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: linear-gradient(180deg, rgba(17,24,39,0) 30%, rgba(17,24,39,0.55) 100%);
  opacity: 0;
  transition: opacity .2s ease;
  pointer-events: none;
  ${SvcCard}:hover & { opacity: 1; pointer-events: auto; }
`;
const SvcCTA = styled.span`
  background: linear-gradient(90deg, #2A4A3A, #D4AF37);
  color: #fff;
  padding: 10px 16px;
  border-radius: 999px;
  font-weight: 600;
  box-shadow: 0 10px 24px rgba(42,74,58,.35);
  transform: translateY(8px);
  transition: transform .18s ease;
  ${SvcCard}:hover & { transform: translateY(0); }
`;

const ServicesSection = () => {
  const cards = [
    { title: "Women's salon at home", desc: 'Complete salon services delivered to your doorstep with professional care' },
    { title: "Women's spa at home", desc: 'Relaxing spa therapies delivered in your comfort zone' },
    { title: 'Bridal services at home', desc: 'Makeover packages curated for your wedding day' },
    { title: 'Pre-bridal services', desc: 'Treatments to prepare you for the big day' },
    { title: 'Mehndi services', desc: 'Beautiful henna designs by expert artists' },
    { title: 'Hair services at home', desc: 'Cutting, styling, coloring, and care at home' },
    { title: 'Makeup services at home', desc: 'Professional makeup for all occasions' },
    { title: 'Skin & body treatments', desc: 'Rejuvenating skin and body care in your space' },
  ];
  return (
    <SvcSectionWrap>
      <SvcContainer>
        <SvcHeader>
          <SvcTitle>Our Services</SvcTitle>
          <SvcSub>
            Experience premium beauty and wellness services at your doorstep with our professional home service packages
          </SvcSub>
        </SvcHeader>
        <SvcGrid>
          {cards.map((c, i) => (
            <SvcCard key={i} href="#book">
              <SvcImg>
                <SvcOverlay>
                  <SvcCTA>Book your service</SvcCTA>
                </SvcOverlay>
              </SvcImg>
              <SvcBody>
                <SvcItemTitle>{c.title}</SvcItemTitle>
                <SvcDesc>{c.desc}</SvcDesc>
              </SvcBody>
              <SvcMobileCTA href="#book">Book your service</SvcMobileCTA>
            </SvcCard>
          ))}
        </SvcGrid>
      </SvcContainer>
    </SvcSectionWrap>
  );
};

// Premium How It Works Section (elegant, responsive)
const HowWrap = styled.section`
  padding: 96px 16px 80px;
  background: linear-gradient(180deg,#ffffff 0%, #fbf9f4 100%);
`;
const HowContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const HowHeader = styled.div`
  text-align: center;
  margin-bottom: 36px;
`;
const HowTitle = styled.h2`
  margin: 0 0 8px 0;
  font-size: clamp(28px, 4vw, 44px);
  background: linear-gradient(90deg, #2A4A3A, #D4AF37);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
const HowSub = styled.p`
  margin: 0;
  color: #6b7280;
`;
const HowGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 20px;
  @media (max-width: 1024px){ grid-template-columns: repeat(8,1fr); }
  @media (max-width: 768px){ grid-template-columns: repeat(4,1fr); }
`;
const HowCard = styled.div`
  grid-column: span 3;
  background: #ffffff;
  border: 1px solid #eef0f3;
  border-radius: 20px;
  box-shadow: 0 10px 28px rgba(0,0,0,.08);
  overflow: hidden;
  transition: transform .18s ease, box-shadow .18s ease;
  &:hover{ transform: translateY(-4px); box-shadow: 0 18px 50px rgba(0,0,0,.12); }
`;
const HowImg = styled.div`
  height: 160px;
  background: #f3f4f6;
`;
const HowBody = styled.div`
  padding: 16px 18px 20px;
`;
const HowStep = styled.div`
  width: 44px; height: 44px; border-radius: 999px;
  background: linear-gradient(90deg,#2A4A3A,#D4AF37);
  color: #fff; display: grid; place-items: center; font-weight: 700;
  box-shadow: 0 6px 16px rgba(42,74,58,.35);
  margin: -22px 0 10px 18px;
`;
const HowTitleSmall = styled.h4`
  margin: 0 0 6px 0; font-size: 18px;
`;
const HowDesc = styled.p`
  margin: 0; color: #6b7280; font-size: 14px; line-height: 1.6;
`;

const HowCTAWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 28px;
`;
const HowCTA = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 18px;
  border-radius: 999px;
  text-decoration: none;
  color: #ffffff;
  font-weight: 600;
  background: linear-gradient(90deg, #2A4A3A, #D4AF37);
  box-shadow: 0 10px 24px rgba(42,74,58,.25);
  transition: transform .18s ease, box-shadow .18s ease;
  &:hover { transform: translateY(-2px); box-shadow: 0 16px 36px rgba(42,74,58,.3); }
`;

const HowItWorksPremium = () => {
  const items = [
    { step: 1, title: 'Select Location', desc: 'Choose your preferred area so we can reach you.' },
    { step: 2, title: 'Choose Services', desc: 'Pick from curated premium beauty and wellness services.' },
    { step: 3, title: 'Pick Slot', desc: 'Select a convenient time that fits your schedule.' },
    { step: 4, title: 'Relax & Enjoy', desc: 'Our experts arrive with premium products—sit back and glow.' },
  ];
  return (
    <HowWrap>
      <HowContainer>
        <HowHeader>
          <HowTitle>How Does It Work?</HowTitle>
          <HowSub>Getting your perfect beauty treatment is as easy as 1‑2‑3‑4</HowSub>
        </HowHeader>
        <HowGrid>
          {items.map((it, i) => (
            <HowCard key={i}>
              <HowImg />
              <HowBody>
                <HowStep>{it.step}</HowStep>
                <HowTitleSmall>{it.title}</HowTitleSmall>
                <HowDesc>{it.desc}</HowDesc>
              </HowBody>
            </HowCard>
          ))}
        </HowGrid>
        <HowCTAWrap>
          <HowCTA href="#book">Start your Journey</HowCTA>
        </HowCTAWrap>
      </HowContainer>
    </HowWrap>
  );
};

// Premium Video Testimonials Section
const VidsWrap = styled.section`
  padding: 96px 16px;
  background: linear-gradient(180deg,#ffffff 0%, #f7fafc 100%);
`;
const VidsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const VidsHeader = styled.div`
  text-align: center; margin-bottom: 28px;
`;
const VidsTitle = styled.h2`
  margin: 0 0 8px 0;
  font-size: clamp(28px, 4vw, 44px);
  background: linear-gradient(90deg, #2A4A3A, #D4AF37);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
`;
const VidsSub = styled.p`
  margin: 0; color: #6b7280;
`;
const VidsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 20px;
  @media (max-width: 1024px){ grid-template-columns: repeat(8,1fr); }
  @media (max-width: 768px){ grid-template-columns: repeat(4,1fr); }
`;
const VidCard = styled.div`
  grid-column: span 3;
  border-radius: 20px;
  overflow: hidden;
  background: #0f172a;
  box-shadow: 0 12px 36px rgba(0,0,0,.18);
  position: relative;
`;
const VidThumb = styled.div`
  height: 220px; background: #111827; position: relative;
`;
const VidOverlay = styled.div`
  position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,.5) 100%);
`;
const PlayButton = styled.button`
  position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%);
  width: 64px; height: 64px; border-radius: 999px; border: none; cursor: pointer;
  display: grid; place-items: center;
  color: #1f2937; background: #ffffff;
  box-shadow: 0 10px 28px rgba(0,0,0,.25);
  transition: transform .18s ease, box-shadow .18s ease;
  &:hover{ transform: translate(-50%,-52%); box-shadow: 0 16px 40px rgba(0,0,0,.3);} 
`;
const VidBody = styled.div`
  padding: 14px 16px; color: #e5e7eb;
`;
const VidTitle = styled.div`
  font-weight: 600; margin-bottom: 4px; color: #ffffff;
`;
const VidMeta = styled.div`
  font-size: 12px; color: #9ca3af;
`;

const VideoTestimonialsSection = () => {
  const vids = [
    { title: "Neha's Bridal Transformation", meta: '2:34 • Bridal', src: '' },
    { title: 'Home Spa Experience', meta: '1:45 • Spa', src: '' },
    { title: 'Hair Styling at Home', meta: '3:12 • Salon', src: '' },
    { title: 'Pre‑Bridal Glow Journey', meta: '4:28 • Bridal', src: '' },
  ];
  return (
    <VidsWrap>
      <VidsContainer>
        <VidsHeader>
          <VidsTitle>Client Stories</VidsTitle>
          <VidsSub>Hear what our clients have to say about their transformation journey with us</VidsSub>
        </VidsHeader>
        <VidsGrid>
          {vids.map((v, i) => (
            <VidCard key={i}>
              <VidThumb>
                <VidOverlay />
                <PlayButton aria-label={`Play ${v.title}`}>
                  ▶
                </PlayButton>
              </VidThumb>
              <VidBody>
                <VidTitle>{v.title}</VidTitle>
                <VidMeta>{v.meta}</VidMeta>
              </VidBody>
            </VidCard>
          ))}
        </VidsGrid>
      </VidsContainer>
    </VidsWrap>
  );
};

// Premium CTA Section
const CTAWrap = styled.section`
  padding: 80px 16px 96px;
  background: #ffffff;
`;
const CTAContainer = styled.div`
  max-width: 1200px; margin: 0 auto;
`;
const CTACard = styled.div`
  position: relative; border-radius: 0;
  padding: 48px 24px 64px; text-align: center;
  background: transparent;
  border: none;
  box-shadow: none;
`;
// Decorative orbs removed for a calmer look
const CTAHeadline = styled.h2`
  margin: 0 0 10px 0;
  font-size: clamp(28px,4.2vw,48px);
  line-height: 1.15;
  font-weight: 600;
  letter-spacing: -0.01em;
  background: linear-gradient(90deg, #2A4A3A, #D4AF37);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;
const CTASub = styled.p`
  margin: 0 0 22px 0;
  color: #6b7280;
  font-size: clamp(14px,1.8vw,15px);
  line-height: 1.7;
  font-weight: 400;
`;
const CTAActions = styled.div`
  display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-top: 8px;
`;
const CTAButtonPrimary = styled.a`
  display: inline-flex; align-items: center; gap: 10px; text-decoration: none;
  padding: 12px 22px; border-radius: 999px; font-weight: 600; letter-spacing: -0.01em;
  color: #ffffff; border: 1px solid rgba(0,0,0,0.04);
  background: linear-gradient(90deg, #2A4A3A, #D4AF37);
  box-shadow: 0 10px 28px rgba(212,175,55,.25), 0 2px 8px rgba(0,0,0,.12);
  transition: transform .18s ease, box-shadow .18s ease, filter .18s ease;
  &:hover{ transform: translateY(-1px); box-shadow: 0 16px 42px rgba(212,175,55,.32), 0 3px 10px rgba(0,0,0,.14); }
  &:focus-visible{ outline: 0; box-shadow: 0 0 0 3px rgba(212,175,55,.45), 0 10px 28px rgba(212,175,55,.25); }
`;
const CTAButtonGhost = styled.a`
  display: inline-flex; align-items: center; gap: 10px; text-decoration: none;
  padding: 12px 20px; border-radius: 999px; font-weight: 600; letter-spacing: -0.01em;
  color: #2A4A3A; background: #ffffff; border: 1px solid rgba(42,74,58,.28);
  transition: background .18s ease, border-color .18s ease, color .18s ease;
  &:hover{ background: rgba(42,74,58,.06); border-color: rgba(42,74,58,.4); }
  &:focus-visible{ outline: 0; box-shadow: 0 0 0 3px rgba(42,74,58,.25); }
`;
// Overlapping, staggered faces (flex + negative margins)
const CTAOverlapRow = styled.div`
  margin-top: 28px; display: flex; justify-content: center; align-items: center;
  height: 200px; /* gives room for rotation */
`;
const OverlapCard = styled.div`
  position: relative; border-radius: 22px; overflow: hidden;
  box-shadow: 0 16px 40px rgba(0,0,0,.12), 0 6px 16px rgba(0,0,0,.06);
  transform: rotate(var(--rot)); z-index: var(--z);
  background: var(--bg, #ffffff); padding: var(--pad, 0px);
  border: none;
  width: var(--w); height: var(--h);
`;
const OverlapImg = styled.img`
  width: 100%; height: 100%; object-fit: cover; border-radius: 16px; display: block;
`;

const CallToActionPremium = () => {
  return (
    <CTAWrap>
      <CTAContainer>
        <CTACard>
          <CTAHeadline>Build and Ship Your Beauty Faster</CTAHeadline>
          <CTASub>High‑quality, customizable at‑home services with a premium experience.</CTASub>
          <CTAActions>
            <CTAButtonPrimary href="#book">Start your Journey</CTAButtonPrimary>
            <CTAButtonGhost href="#learn">Learn more</CTAButtonGhost>
          </CTAActions>
          <CTAOverlapRow>
            {/* Image 1 - smallest, far left, behind */}
            <OverlapCard style={{ ['--w']: '96px', ['--h']: '96px', ['--rot']: '-15deg', ['--z']: 1, ['--bg']: '#ffffff', marginLeft: '0' }}>
              <OverlapImg loading="lazy" src="/avatar-1.jpg" alt="User 1" />
            </OverlapCard>
            {/* Image 2 - medium, left of center, behind center */}
            <OverlapCard style={{ ['--w']: '140px', ['--h']: '140px', ['--rot']: '7deg', ['--z']: 2, ['--bg']: '#D4AF37', marginLeft: '-12px' }}>
              <OverlapImg loading="lazy" src="/avatar-2.jpg" alt="User 2" />
            </OverlapCard>
            {/* Image 3 - largest, top layer */}
            <OverlapCard style={{ ['--w']: '220px', ['--h']: '220px', ['--rot']: '-3deg', ['--z']: 3, ['--bg']: '#1f2937', marginLeft: '-18px' }}>
              <OverlapImg loading="lazy" src="/avatar-3.jpg" alt="User 3" />
            </OverlapCard>
            {/* Image 4 - medium, right of center, behind center */}
            <OverlapCard style={{ ['--w']: '140px', ['--h']: '140px', ['--rot']: '-10deg', ['--z']: 2, ['--bg']: '#f3f4f6', marginLeft: '-18px' }}>
              <OverlapImg loading="lazy" src="/avatar-4.webp" alt="User 4" />
            </OverlapCard>
            {/* Image 5 - smallest, far right, behind */}
            <OverlapCard style={{ ['--w']: '96px', ['--h']: '96px', ['--rot']: '15deg', ['--z']: 1, ['--bg']: '#2A4A3A', marginLeft: '-12px' }}>
              <OverlapImg loading="lazy" src="/avatar-5.jpeg" alt="User 5" />
            </OverlapCard>
          </CTAOverlapRow>
        </CTACard>
      </CTAContainer>
    </CTAWrap>
  );
};
// Premium Written Testimonials Section
const WTWrap = styled.section`
  padding: 96px 16px;
  background: linear-gradient(180deg,#ffffff 0%, #fbf7ff 100%);
`;
const WTContainer = styled.div`
  max-width: 1200px; margin: 0 auto;
`;
const WTHeader = styled.div`
  text-align: center; margin-bottom: 28px;
`;
const WTTitle = styled.h2`
  margin: 0 0 8px 0; font-size: clamp(28px,4vw,44px);
  background: linear-gradient(90deg,#2A4A3A,#D4AF37);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
`;
const WTSub = styled.p`
  margin: 0; color: #6b7280;
`;
const WTTracks = styled.div`
  display: grid; gap: 16px;
`;
const WTTrack = styled.div`
  overflow: hidden; position: relative;
  &:hover ${/* pause both marquees on hover */''}WTMarquee,
  &:hover WTMarqueeRev {
    animation-play-state: paused;
  }
`;
const WTMarquee = styled.div`
  display: inline-flex; gap: 16px; padding: 4px 0;
  will-change: transform;
  animation: scrollX var(--dur, 35s) linear infinite;
  @keyframes scrollX {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;
const WTMarqueeRev = styled(WTMarquee)`
  animation-direction: reverse;
`;
const WTCard = styled.div`
  width: 520px; max-width: 90vw; flex: 0 0 auto;
  position: relative; border-radius: 22px;
  background: #ffffff; border: 1px solid #eef0f3;
  padding: 20px; box-shadow: 0 6px 18px rgba(0,0,0,.06);
  overflow: hidden;
  &::after{
    content: '';
    position: absolute; left: 0; right: 0; bottom: 0; height: 10px;
    background: linear-gradient(90deg, var(--from, #2A4A3A), var(--to, #D4AF37));
    opacity: 0; transition: opacity .18s ease;
  }
  &:hover::after{ opacity: 1; }
`;
const WTQuote = styled.div`
  position: absolute; right: 16px; top: 16px; color: #e9d5ff; font-size: 28px; font-weight: 700;
`;
const WTRating = styled.div`
  color: #f59e0b; margin-bottom: 10px; font-size: 16px; letter-spacing: 1px;
`;
const WTText = styled.p`
  margin: 0 0 16px 0; color: #374151; line-height: 1.7;
`;
const WTAuthor = styled.div`
  display: flex; align-items: center; gap: 12px;
`;
const WTTag = styled.span`
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 12px; font-weight: 600; color: #1f2937;
  background: linear-gradient(135deg, var(--from, #e5f3ec), var(--to, #fbf4de));
  border-radius: 999px; padding: 6px 10px; margin-top: 10px;
`;
const WTAvatar = styled.div`
  width: 40px; height: 40px; border-radius: 999px; background: #e5e7eb; overflow: hidden;
`;
const WTMeta = styled.div`
  display: grid; gap: 2px; font-size: 12px; color: #6b7280;
`;
const WTName = styled.div`
  font-weight: 600; color: #111827; font-size: 14px;
`;

const WrittenTestimonialsPremium = () => {
  const rowA = [
    { name: 'Ritu Agarwal', tag: '#Facial & Spa', ago: '1m ago', text: "My skin has never looked better! The relaxing atmosphere and expert care make every visit delightful.", rating: 5 },
    { name: 'Sunita Kapoor', tag: '#Hair Styling', ago: '3w ago', text: "Amazing hair transformation! Beyond expectations with the perfect cut and color.", rating: 5 },
    { name: 'Meera Joshi', tag: '#Bridal Package', ago: '2m ago', text: "Best decision for my bridal package! Everything was flawless.", rating: 5 },
    { name: 'Divya Patel', tag: '#Regular Client', ago: '5d ago', text: "Consistent quality every time. The staff treats you like family.", rating: 5 },
    { name: 'Pooja Sharma', tag: '#Nail Art', ago: '1w ago', text: "Nail art designs are creative and beautiful. Incredible detail!", rating: 5 },
  ];
  const rowB = [
    { name: 'Aisha Khan', tag: '#Makeup', ago: '4w ago', text: "Loved my party makeup—classy and long‑lasting.", rating: 5 },
    { name: 'Rhea Sen', tag: '#Spa Luxe', ago: '2w ago', text: "Home spa was soothing and professional. Five stars!", rating: 5 },
    { name: 'Anita Verma', tag: '#Pre‑Bridal', ago: '6w ago', text: "Pre‑bridal routine made a visible difference.", rating: 5 },
    { name: 'Kritika Rao', tag: '#Hair Color', ago: '9d ago', text: "Perfect shade and zero damage. Highly recommended.", rating: 5 },
    { name: 'Mitali Das', tag: '#Cleanup', ago: '3w ago', text: "Cleanup left my skin fresh and glowing.", rating: 5 },
  ];
  // Duplicate to reach ~10 per layer for seamless looping
  const trackTop = [...rowA, ...rowA];
  const trackBottom = [...rowB, ...rowB];
  const palettes = [
    ['#2A4A3A','#D4AF37'],
    ['#1E3A34','#B68C2C'],
    ['#0F3D3E','#A47C1B'],
    ['#275D52','#D0B36E'],
    ['#1B4332','#C9A227'],
  ];
  return (
    <WTWrap>
      <WTContainer>
        <WTHeader>
          <WTTitle>What Our Clients Say</WTTitle>
          <WTSub>Read the beautiful experiences shared by our valued clients</WTSub>
        </WTHeader>
        <WTTracks>
          <WTTrack>
            <WTMarquee style={{ ['--dur']: '36s' }}>
              {trackTop.map((t, i) => (
                <WTCard key={`t${i}`} style={{ ['--from']: palettes[i % palettes.length][0], ['--to']: palettes[i % palettes.length][1] }}>
                    <WTQuote>”</WTQuote>
                    <WTRating>{'★★★★★'.slice(0, t.rating)}</WTRating>
                    <WTText>“{t.text}”</WTText>
                    <WTTag style={{ ['--from']: palettes[i % palettes.length][0] + '22', ['--to']: palettes[i % palettes.length][1] + '22' }}>{t.tag}</WTTag>
                    <WTAuthor>
                      <WTAvatar />
                      <WTMeta>
                        <WTName>{t.name}</WTName>
                        <div>{t.ago}</div>
                      </WTMeta>
                    </WTAuthor>
                </WTCard>
              ))}
            </WTMarquee>
          </WTTrack>
          <WTTrack>
            <WTMarqueeRev style={{ ['--dur']: '32s' }}>
              {trackBottom.map((t, i) => (
                <WTCard key={`b${i}`} style={{ ['--from']: palettes[(i+1) % palettes.length][0], ['--to']: palettes[(i+1) % palettes.length][1] }}>
                    <WTQuote>”</WTQuote>
                    <WTRating>{'★★★★★'.slice(0, t.rating)}</WTRating>
                    <WTText>“{t.text}”</WTText>
                    <WTTag style={{ ['--from']: palettes[(i+1) % palettes.length][0] + '22', ['--to']: palettes[(i+1) % palettes.length][1] + '22' }}>{t.tag}</WTTag>
                    <WTAuthor>
                      <WTAvatar />
                      <WTMeta>
                        <WTName>{t.name}</WTName>
                        <div>{t.ago}</div>
                      </WTMeta>
                    </WTAuthor>
                </WTCard>
              ))}
            </WTMarqueeRev>
          </WTTrack>
        </WTTracks>
      </WTContainer>
    </WTWrap>
  );
};

// (Removed legacy Rail, Shortcuts and Promo components to avoid conflicts)
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
        {/* Fallback Background for Fast Loading */}
        <VideoFallback />
        {/* Video Background */}
        <VideoBg
          ref={videoRef}
          autoPlay
          muted={isVideoMuted}
          loop
          playsInline
          preload="none" /* Don't preload on mobile for faster initial load */
          poster="" /* Add a poster image for better loading experience */
          loading="lazy" /* Lazy load the video */
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
      {/* Our Services Section */}
      <ServicesSection />
      <HowItWorksPremium />
      <VideoTestimonialsSection />
      <WrittenTestimonialsPremium />
      <CallToActionPremium />
    </>
  );
}

const CarouselWrap = styled.section`
  padding: 8px 16px 24px;
  background: #fff;
`;
// Carousel legacy styled components removed
// Removed PromoCarousel legacy components
