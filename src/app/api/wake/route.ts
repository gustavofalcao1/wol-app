import { NextResponse } from 'next/server';
import wol from 'node-wol';

// Função para formatar o MAC address
function formatMacAddress(mac: string): string {
  // Remove todos os caracteres não hexadecimais
  const cleanMac = mac.replace(/[^0-9A-Fa-f]/g, '');
  
  // Verifica se tem 12 caracteres (6 bytes)
  if (cleanMac.length !== 12) {
    throw new Error('Invalid MAC address length');
  }

  // Formata como XX:XX:XX:XX:XX:XX
  return cleanMac.match(/.{2}/g)?.join(':') || '';
}

// Função para validar o MAC address
function isValidMacAddress(mac: string): boolean {
  const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
  return macRegex.test(mac);
}

export async function POST(request: Request) {
  try {
    const { mac, ip } = await request.json();

    // Valida o MAC address
    if (!mac) {
      return NextResponse.json(
        { error: 'MAC address is required' },
        { status: 400 }
      );
    }

    // Tenta formatar o MAC address
    let formattedMac: string;
    try {
      formattedMac = formatMacAddress(mac);
    } catch (error) {
      return NextResponse.json(
        { 
          error: 'Invalid MAC address format',
          details: error instanceof Error ? error.message : String(error)
        },
        { status: 400 }
      );
    }

    // Verifica se o MAC address está no formato correto
    if (!isValidMacAddress(formattedMac)) {
      return NextResponse.json(
        { error: 'Invalid MAC address format' },
        { status: 400 }
      );
    }

    // Envia o pacote WOL
    await new Promise((resolve, reject) => {
      wol.wake(formattedMac, { address: ip || '255.255.255.255' }, (error: any) => {
        if (error) reject(error);
        else resolve(true);
      });
    });

    return NextResponse.json({ 
      success: true,
      message: 'Wake-on-LAN packet sent successfully',
      target: formattedMac
    });
  } catch (error) {
    console.error('Failed to wake device:', error);
    return NextResponse.json(
      { 
        error: 'Failed to wake device',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
