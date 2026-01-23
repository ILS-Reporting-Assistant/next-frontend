import { Image } from '@app/components'

export const MasterCardImage: React.FC = () => {
  return <Image preview={false} src="../images/mastercard-icon.svg" style={{ height: '52px', width: '100px' }} />
}
export const VisaCardImage: React.FC = () => {
  return <Image preview={false} src="../images/visa-icon.svg" style={{ height: '52px', width: '100px' }} />
}
export const AmexCardImage: React.FC = () => {
  return <Image preview={false} src="../images/americal-express.svg" style={{ height: '52px', width: '100px' }} />
}
export const DiscoverCardImage: React.FC = () => {
  return <Image preview={false} src="../images/discover.svg" style={{ height: '52px', width: '100px' }} />
}
export const JCBCardImage: React.FC = () => {
  return <Image preview={false} src="../images/jcb.svg" style={{ height: '52px', width: '100px' }} />
}
export const DinersClubCardImage: React.FC = () => {
  return <Image preview={false} src="../images/dinner-club.svg" style={{ height: '52px', width: '100px' }} />
}
export const UnionPayCardImage: React.FC = () => {
  return <Image preview={false} src="../images/union-pay.svg" style={{ height: '52px', width: '100px' }} />
}
export const MaestroCardImage: React.FC = () => {
  return <Image preview={false} src="../images/maestro.svg" style={{ height: '52px', width: '100px' }} />
}
export const DefaultCardImage: React.FC = () => {
  return <Image preview={false} src="../images/default-card.svg" style={{ height: '52px', width: '100px' }} />
}
export const PaymentImage: React.FC<{ height?: number }> = ({ height = '200px' }) => {
  return <Image preview={false} src="../images/payment.svg" style={{ height: height, width: '100%' }} />
}
