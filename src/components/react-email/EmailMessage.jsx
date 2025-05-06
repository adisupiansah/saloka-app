// components/VerificationCodeEmail.jsx
import {
    Body,
    Column,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Preview,
    Row,
    Section,
    Text,
  } from '@react-email/components';
  
  const baseUrlLogoLogistik = 'https://kalbar.polri.go.id/uploads/2024-10/VXMnfSuBN42jxOXsNuLj0nheNeI7xoytbhjIBBl8.png'
  
  export const VerificationCodeEmail = ({ code }) => (
    <Html>
      <Head />
      <Preview>Kode Verifikasi SALOKA</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={headerSection}>
            <Row>
              <Column align="center">
                <Img
                  src={baseUrlLogoLogistik} // Ganti dengan logo Anda jika ada
                  width="80"
                  height="80"
                  alt="SALOKA Logo"
                  style={logo}
                />
                <Text style={title}>SALOKA - POLRES KARIMUN</Text>
              </Column>
            </Row>
          </Section>
  
          <Section style={contentSection}>
            <Text style={paragraph}>Gunakan kode berikut untuk menyelesaikan login:</Text>
            <Text style={Textcode}>{code}</Text>
            <Text style={smallParagraph}>Kode ini berlaku selama 10 menit.</Text>
          </Section>
  
          <Hr style={hr} />
  
          <Section style={footerSection}>
            <Text style={smallParagraph}>© 2025 Saloka Polres Karimun</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
  
  export default VerificationCodeEmail;
  
  // Styles
  const main = {
    backgroundColor: '#f6f9fc',
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  };
  
  const container = {
    margin: '0 auto',
    padding: '20px 0 48px',
    width: '480px',
    maxWidth: '100%',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
  };
  
  const headerSection = {
    marginBottom: '24px',
  };
  
  const logo = {
    verticalAlign: 'middle',
    marginRight: '8px',
  };
  
  const title = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333333',
    display: 'inline-block',
  };
  
  const contentSection = {
    padding: '0 40px',
  };
  
  const paragraph = {
    fontSize: '16px',
    lineHeight: '24px',
    color: '#3c4043',
  };
  
  const Textcode = {
    fontSize: '24px',
    fontWeight: '700',
    letterSpacing: '8px',
    textAlign: 'center',
    color: '#004dcf',
    margin: '20px 0',
  };
  
  const smallParagraph = {
    fontSize: '12px',
    color: '#999999',
  };
  
  const hr = {
    borderColor: '#e8eaed',
    margin: '20px 40px',
  };
  
  const footerSection = {
    textAlign: 'center',
  };