import React from 'react';
import Details from './Details/Details';
export default function MainPage() {
  return (
    <div style={{
      height: '100vh',
      backgroundColor: 'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '30px'
    }}>
      메인 페이지 (내용 준비 중)
      <Details />
    </div>
  );
}
