#!/usr/bin/env python3
"""Local static server for testing the site."""

from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import argparse
import socket
import webbrowser
import os


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Serve this site locally for testing."
    )
    parser.add_argument(
        "--port",
        type=int,
        default=8000,
        help="Port to run the server on (default: 8000).",
    )
    parser.add_argument(
        "--open",
        action="store_true",
        help="Open the site automatically in your default browser.",
    )
    return parser.parse_args()


def get_local_ip() -> str:
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as sock:
            sock.connect(("8.8.8.8", 80))
            return sock.getsockname()[0]
    except OSError:
        return "127.0.0.1"


def main() -> None:
    args = parse_args()
    root = Path(__file__).resolve().parent
    os.chdir(root)

    server = ThreadingHTTPServer(("0.0.0.0", args.port), SimpleHTTPRequestHandler)
    localhost_url = f"http://localhost:{args.port}/"
    lan_url = f"http://{get_local_ip()}:{args.port}/"

    print("Serving InQueApps website")
    print(f"Root: {root}")
    print(f"Local: {localhost_url}")
    print(f"LAN:   {lan_url}")
    print("Press Ctrl+C to stop.")

    if args.open:
        webbrowser.open(localhost_url)

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping server...")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
