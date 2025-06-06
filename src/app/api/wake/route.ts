import { NextResponse } from 'next/server';
import wol from 'node-wol';

/**
 * Format MAC address to standard XX:XX:XX:XX:XX:XX format
 * @param mac MAC address in any format
 * @returns Formatted MAC address
 */
function formatMacAddress(mac: string): string {
  // Remove all non-hexadecimal characters
  const cleanMac = mac.replace(/[^0-9A-Fa-f]/g, '');
  
  // Check if it has 12 characters (6 bytes)
  if (cleanMac.length !== 12) {
    throw new Error('Invalid MAC address length');
  }

  // Format as XX:XX:XX:XX:XX:XX
  return cleanMac.match(/.{2}/g)?.join(':') || '';
}

/**
 * Validate MAC address format
 * @param mac MAC address to validate
 * @returns true if MAC is valid
 */
function isValidMacAddress(mac: string): boolean {
  const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
  return macRegex.test(mac);
}

/**
 * Wake-on-LAN API endpoint
 */
export async function POST(request: Request) {
  try {
    const { mac, ip } = await request.json();

    // Validate MAC address
    if (!mac) {
      return NextResponse.json(
        { error: 'MAC address is required' },
        { status: 400 }
      );
    }

    // Try to format MAC address
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

    // Check if MAC address is in correct format
    if (!isValidMacAddress(formattedMac)) {
      return NextResponse.json(
        { error: 'Invalid MAC address format' },
        { status: 400 }
      );
    }

    // Send WOL packet
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
