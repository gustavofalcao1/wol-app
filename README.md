# 🌐 Wake-on-LAN Web Application

A modern, responsive web application designed to remotely manage and wake computers using **Wake-on-LAN (WoL)** technology. Built using **Next.js** and fully typed with **TypeScript**, the app simplifies remote administration and enhances network efficiency.

---

## ✨ Features

- 🖥️ **Computer & Group Management**: Easily organize and control multiple devices.
- 🌐 **Remote Wake-up**: Instantly wake devices using WoL packets.
- 🔄 **Real-time Updates**: Automatically refreshes every 5 seconds.
- 📱 **Responsive Interface**: Seamlessly usable on all devices.
- 🎯 **Group Organization**: Efficiently manage computers in groups.
- ⚡ **Fast and Efficient Performance**.

---

## 🛠️ Technology Stack

- **Next.js 13** (App Router)
- **TypeScript** for full type safety
- **JSON Server** for data persistence
- **node-wol** for WoL packet handling

---

## 📋 Prerequisites

- Node.js v18.x or later
- npm v9.x or later
- Network configured to allow WoL packets

---

## 🚀 Installation

Clone the repository:
```bash
git clone https://github.com/gustavofalcao1/wol-app.git
cd wol-app
```

Install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```

Access the application at [http://localhost:3000](http://localhost:3000).

---

## ▶️ Usage

1. **Add Computers**: Provide name, IP, and MAC addresses.
2. **Create Groups**: Organize computers into manageable groups.
3. **Wake Devices**: Click "Wake" to send WoL packets instantly.
4. **Edit Groups**: Update group membership easily.

---

## 📂 Project Structure

```
wol-app/
├── src/
│   ├── app/            # Next.js application routes and API
│   │   ├── api/        # API endpoints
│   │   └── page.tsx    # Main interface
│   ├── components/     # UI components
│   ├── data/           # JSON-based storage
│   └── types/          # TypeScript definitions
├── public/             # Static assets
└── package.json        # Dependencies and scripts
```

---

## 🌐 API Reference

- **Wake Device**: `POST /api/wake`
  - Request Body:
    ```json
    { "mac": "MAC_ADDRESS", "ip": "IP_ADDRESS" }
    ```
  - Response:
    ```json
    { "message": "Success or Error description" }
    ```

---

## 📈 Version History

### v0.1.2 (Current)
- Enhanced MAC address validation
- Added auto-refresh capabilities
- Improved group management UI

---

## 🤝 Contributing

Contributions are welcome:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/feature-name`)
3. Commit your changes (`git commit -m 'Add feature-name'`)
4. Push the changes (`git push origin feature/feature-name`)
5. Open a Pull Request

---

## 📄 License

Licensed under the **MIT License**. See [LICENSE](LICENSE) for full details.

---

## 🙌 Acknowledgments

- Built with [Next.js](https://nextjs.org)
- Wake-on-LAN powered by [node-wol](https://github.com/song940/node-wol)
- Data management using [JSON Server](https://github.com/typicode/json-server)

---

## 👤 Author
**Gustavo Falcão**  
[GitHub @gustavofalcao1](https://github.com/gustavofalcao1)  
[Project Repository](https://github.com/gustavofalcao1/wol-app)

---
