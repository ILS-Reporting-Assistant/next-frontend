import { Image } from '@app/components'
import React from 'react'

export const SignupImage: React.FC = () => {
  return (
    <Image
      preview={false}
      src="/images/signup-image.png"
      style={{
        height: '100%',
        width: '100%',
        objectFit: 'cover',
      }}
    />
  )
}

export const SigninImage: React.FC<{ height?: number }> = ({ height = '100%' }) => {
  return (
    <Image
      preview={false}
      src="/images/signin-image.png"
      style={{ height: height, width: '100%', objectFit: 'cover' }}
    />
  )
}

export const VisaCardImage: React.FC = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="24" viewBox="0 0 96 50" style={{ height: '32px', width: 'auto' }}>
      <g id="VISA_logo" data-name="VISA logo" transform="translate(-163 -263)">
        <g id="Rectangle_1314" data-name="Rectangle 1314" transform="translate(163 263)" fill="#fff" stroke="#f1f1f1" strokeWidth="1" opacity="0">
          <rect width="96" height="50" rx="2" stroke="none"/>
          <rect x="0.5" y="0.5" width="95" height="49" rx="1.5" fill="none"/>
        </g>
        <g id="Visa" transform="translate(175 276)">
          <g id="Group_6" data-name="Group 6">
            <path id="Path_18" data-name="Path 18" d="M31.472,23.16H25.548L29.25.407h5.925ZM20.565.407,14.917,16.055l-.669-3.371h0L12.256,2.457A2.536,2.536,0,0,0,9.448.407H.11L0,.79a22.155,22.155,0,0,1,6.2,2.6L11.345,23.16h6.173L26.942.407ZM67.158,23.16H72.6L67.855.407H63.093A2.726,2.726,0,0,0,60.357,2.1L51.524,23.16H57.7l1.235-3.378h7.529l.694,3.378ZM60.64,15.11l3.112-8.516L65.5,15.11ZM51.986,5.88,52.831.994A17.073,17.073,0,0,0,47.5,0c-2.94,0-9.92,1.284-9.92,7.533,0,5.88,8.2,5.952,8.2,9.04s-7.35,2.533-9.775.587l-.88,5.11a16.624,16.624,0,0,0,6.687,1.284c4.044,0,10.141-2.094,10.141-7.791,0-5.918-8.268-6.466-8.268-9.04s5.769-2.239,8.3-.842Z" transform="translate(0 0)" fill="#2566af"/>
          </g>
          <path id="Path_19" data-name="Path 19" d="M14.251,23.984,12.256,13.75A2.536,2.536,0,0,0,9.448,11.7H.11L0,12.086A22.978,22.978,0,0,1,8.792,16.5,17.758,17.758,0,0,1,14.251,23.984Z" transform="translate(0 -11.296)" fill="#e6a540"/>
        </g>
      </g>
    </svg>
  )
}

export const MasterCardImage: React.FC = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="24" viewBox="0 0 96 50" style={{ height: '32px', width: 'auto' }}>
      <g id="Mastercard_logo" data-name="Mastercard logo" transform="translate(-86 -425)">
        <g id="Rectangle_1314" data-name="Rectangle 1314" transform="translate(86 425)" fill="#fff" stroke="#f1f1f1" strokeWidth="1" opacity="0">
          <rect width="96" height="50" rx="2" stroke="none"/>
          <rect x="0.5" y="0.5" width="95" height="49" rx="1.5" fill="none"/>
        </g>
        <g transform="translate(110 433)">
          <circle cx="12" cy="17.5" r="17.5" fill="#EB001B"/>
          <circle cx="36" cy="17.5" r="17.5" fill="#F79E1B"/>
          <path d="M24 7C20 8 17 10 15.5 12.5C14 10 11 8 7 7C11 8 14 10 15.5 12.5C17 10 20 8 24 7Z" fill="#FF5F00"/>
        </g>
      </g>
    </svg>
  )
}
