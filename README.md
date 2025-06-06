# Wake-on-LAN Web Application

A modern web application for managing and waking computers remotely using Wake-on-LAN (WoL) technology. Built with Next.js and TypeScript.

## Features

- 🖥️ Manage computers and groups
- 🌐 Wake computers remotely via WoL
- 🔄 Real-time updates (5-second refresh)
- 📱 Responsive design
- 🎯 Group-based organization
- ⚡ Fast and efficient

## Prerequisites

- Node.js 18.x or later
- npm 9.x or later
- Network that allows WoL packets

## Installation

1. Clone the repository:
```bash
git clone https://github.com/gustavofalcao1/wol-app.git
cd wol-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Usage

1. **Add Computers**: Add computers with their name, IP address, and MAC address
2. **Create Groups**: Organize computers into groups for easier management
3. **Wake Computers**: Click the "Wake" button to send WoL packets
4. **Manage Groups**: Add/remove computers from groups as needed

## Project Structure

```
wakeonlan/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── api/         # API routes
│   │   └── page.tsx     # Main page component
│   ├── components/      # React components
│   ├── data/           # JSON database
│   └── types/          # TypeScript types
├── public/             # Static files
└── package.json        # Project dependencies
```

---

## API Endpoints

- `POST /api/wake`: Wake a computer
  - Body: `{ mac: string, ip: string }`
  - Returns: Success/error message

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Version History

- v0.1.2 - Current version
  - Improved MAC address validation
  - Auto-refresh functionality
  - Group management enhancements

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with Next.js 13
- Uses node-wol for Wake-on-LAN functionality
- JSON Server for data management
