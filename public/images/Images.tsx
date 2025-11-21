import { Image } from '@app/components'

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
