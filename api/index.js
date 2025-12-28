// api/index.js
module.exports = async (req, res) => {
  // Аналог TOKEN_SECRET из env Cloudflare
  const TOKEN_SECRET = process.env.TOKEN_SECRET || "U3VwZXJTZWNyZXRLZXkzMjAyNC1DbG91ZGZsYXJlLVdrcg==";
  const TARGET_URL = "https://mirror.piratbit.fun";
  
  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname;
  
  // Установка общих заголовков
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // 1. ГЛАВНАЯ СТРАНИЦА
  if (path === '/' || path === '') {
    // Генерируем токен на сервере для безопасности
    const timestamp = Math.floor(Date.now() / 1000);
    const data = timestamp + ':' + TOKEN_SECRET;
    const token = Buffer.from(data).toString('base64');
    const accessUrl = '/access?t=' + encodeURIComponent(token);
    
    const html = `
      <!DOCTYPE html>
      <html lang="ru">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>🔐 Secure Gateway | Защищённый доступ</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
        <style>
          :root {
            --primary: #6366f1;
            --primary-dark: #4f46e5;
            --secondary: #10b981;
            --dark: #0f172a;
            --dark-light: #1e293b;
            --text: #f1f5f9;
            --text-secondary: #94a3b8;
            --success: #22c55e;
            --warning: #f59e0b;
            --danger: #ef4444;
            --glass: rgba(255, 255, 255, 0.05);
            --glass-border: rgba(255, 255, 255, 0.1);
          }
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Inter', sans-serif;
            background: linear-gradient(135deg, var(--dark) 0%, #1e1b4b 100%);
            color: var(--text);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            position: relative;
            overflow-x: hidden;
          }
          
          body::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
              radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.1) 0%, transparent 50%);
            z-index: -1;
          }
          
          .container {
            width: 100%;
            max-width: 480px;
            animation: fadeIn 0.6s ease-out;
          }
          
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .header {
            text-align: center;
            margin-bottom: 2rem;
          }
          
          .logo {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            margin-bottom: 1rem;
          }
          
          .logo-icon {
            width: 48px;
            height: 48px;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: pulse 2s infinite;
          }
          
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          
          .logo-icon svg {
            width: 24px;
            height: 24px;
            fill: white;
          }
          
          .logo-text {
            font-size: 1.5rem;
            font-weight: 700;
            background: linear-gradient(to right, var(--primary), var(--secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          
          .tagline {
            color: var(--text-secondary);
            font-size: 0.9rem;
            letter-spacing: 0.5px;
          }
          
          .card {
            background: var(--glass);
            backdrop-filter: blur(10px);
            border: 1px solid var(--glass-border);
            border-radius: 20px;
            padding: 2rem;
            margin-bottom: 1.5rem;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          
          .card:hover {
            transform: translateY(-2px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          }
          
          .card-title {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 10px;
          }
          
          .card-title svg {
            fill: var(--primary);
          }
          
          .target-info {
            background: var(--dark-light);
            border-radius: 12px;
            padding: 1rem;
            margin: 1.5rem 0;
            border-left: 4px solid var(--primary);
          }
          
          .target-label {
            display: block;
            color: var(--text-secondary);
            font-size: 0.85rem;
            margin-bottom: 4px;
          }
          
          .target-url {
            font-family: 'JetBrains Mono', monospace;
            color: var(--secondary);
            font-weight: 500;
            word-break: break-all;
          }
          
          .security-badges {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            margin: 1.5rem 0;
          }
          
          .badge {
            background: var(--dark-light);
            border: 1px solid var(--glass-border);
            border-radius: 20px;
            padding: 8px 16px;
            font-size: 0.8rem;
            display: flex;
            align-items: center;
            gap: 6px;
            transition: all 0.3s ease;
          }
          
          .badge:hover {
            background: var(--primary);
            transform: translateY(-1px);
          }
          
          .badge svg {
            fill: currentColor;
            width: 14px;
            height: 14px;
          }
          
          .btn-primary {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            width: 100%;
            padding: 1.25rem;
            background: linear-gradient(135deg, var(--primary), var(--primary-dark));
            color: white;
            border: none;
            border-radius: 12px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            margin: 1.5rem 0;
            position: relative;
            overflow: hidden;
          }
          
          .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(99, 102, 241, 0.4);
          }
          
          .btn-primary:active {
            transform: translateY(0);
          }
          
          .btn-primary::after {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
            transform: rotate(45deg);
            transition: transform 0.6s;
          }
          
          .btn-primary:hover::after {
            transform: rotate(45deg) translate(20%, 20%);
          }
          
          .spinner {
            display: none;
            animation: spin 1s linear infinite;
          }
          
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          .status {
            text-align: center;
            min-height: 24px;
            margin: 1rem 0;
            font-size: 0.9rem;
            color: var(--text-secondary);
            transition: all 0.3s ease;
          }
          
          .countdown {
            font-size: 0.9rem;
            color: var(--warning);
            font-weight: 500;
          }
          
          .progress-container {
            height: 4px;
            background: var(--dark-light);
            border-radius: 2px;
            margin: 1.5rem 0;
            overflow: hidden;
          }
          
          .progress-bar {
            height: 100%;
            background: linear-gradient(90deg, var(--primary), var(--secondary));
            width: 0%;
            border-radius: 2px;
            transition: width 0.3s ease;
          }
          
          .manual-link {
            text-align: center;
            margin-top: 1rem;
          }
          
          .manual-link a {
            color: var(--text-secondary);
            text-decoration: none;
            font-size: 0.9rem;
            transition: color 0.3s ease;
          }
          
          .manual-link a:hover {
            color: var(--primary);
          }
          
          .footer {
            text-align: center;
            margin-top: 2rem;
            color: var(--text-secondary);
            font-size: 0.8rem;
          }
          
          .footer-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
            margin-top: 1rem;
          }
          
          .footer-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;
          }
          
          .footer-value {
            font-weight: 600;
            color: var(--text);
          }
          
          /* Анимация появления */
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .animate-slide-up {
            animation: slideUp 0.6s ease-out forwards;
            opacity: 0;
          }
          
          .delay-100 { animation-delay: 0.1s; }
          .delay-200 { animation-delay: 0.2s; }
          .delay-300 { animation-delay: 0.3s; }
          .delay-400 { animation-delay: 0.4s; }
          
          /* Адаптивность */
          @media (max-width: 480px) {
            .container {
              padding: 10px;
            }
            
            .card {
              padding: 1.5rem;
            }
            
            .footer-grid {
              grid-template-columns: 1fr;
            }
          }
        </style>
        <script>
          document.addEventListener('DOMContentLoaded', function() {
            const btn = document.getElementById('secure-btn');
            const spinner = document.getElementById('spinner');
            const status = document.getElementById('status');
            const progressBar = document.getElementById('progress-bar');
            const countdownEl = document.getElementById('countdown');
            const timeLeftEl = document.getElementById('time-left');
            
            let countdown = 20;
            let progress = 0;
            let autoRedirectTimer;
            
            // Обновление прогресс-бара
            function updateProgress() {
              progress += 100 / (countdown * 10); // 10 обновлений в секунду
              progressBar.style.width = Math.min(progress, 100) + '%';
              
              if (progress < 100) {
                setTimeout(updateProgress, 100);
              }
            }
            
            // Обратный отсчёт
            function startCountdown() {
              const interval = setInterval(() => {
                countdown--;
                timeLeftEl.textContent = countdown;
                
                if (countdown <= 0) {
                  clearInterval(interval);
                  performRedirect();
                }
              }, 1000);
            }
            
            // Функция редиректа
            function performRedirect() {
              status.innerHTML = '<span style="color: var(--success)">✓ Перенаправление...</span>';
              btn.disabled = true;
              btn.style.opacity = '0.7';
              btn.style.cursor = 'not-allowed';
              
              setTimeout(() => {
                window.location.href = '${accessUrl}';
              }, 500);
            }
            
            // Клик по кнопке
            btn.addEventListener('click', function(e) {
              e.preventDefault();
              
              // Показываем спиннер и меняем текст
              spinner.style.display = 'block';
              btn.innerHTML = 'Подготовка доступа...';
              status.innerHTML = '<span style="color: var(--warning)">🔐 Проверка безопасности...</span>';
              btn.disabled = true;
              
              // Имитация проверки
              setTimeout(() => {
                performRedirect();
              }, 800);
            });
            
            // Автоматический редирект через 20 секунд
            autoRedirectTimer = setTimeout(() => {
              status.innerHTML = '<span style="color: var(--warning)">⚠️ Автоматический переход...</span>';
              setTimeout(performRedirect, 2000);
            }, 20000);
            
            // Запускаем прогресс бар и отсчёт
            updateProgress();
            startCountdown();
            
            // Отмена авто-редиректа при взаимодействии
            document.addEventListener('click', function() {
              clearTimeout(autoRedirectTimer);
              status.innerHTML = '<span style="color: var(--text-secondary)">Авто-редирект отменён</span>';
            });
            
            // Анимация появления элементов
            const animatedElements = document.querySelectorAll('.animate-slide-up');
            animatedElements.forEach((el, index) => {
              el.style.animationDelay = (index * 100) + 'ms';
            });
          });
        </script>
      </head>
      <body>
        <div class="container">
          <!-- Заголовок -->
          <div class="header animate-slide-up">
            <div class="logo">
              <div class="logo-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.1 14.8,9.5V11C15.4,11 16,11.6 16,12.3V15.8C16,16.4 15.4,17 14.7,17H9.2C8.6,17 8,16.4 8,15.7V12.2C8,11.6 8.6,11 9.2,11V9.5C9.2,8.1 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,9.5V11H13.5V9.5C13.5,8.7 12.8,8.2 12,8.2Z"/>
                </svg>
              </div>
              <div class="logo-text">Secure Gateway</div>
            </div>
            <div class="tagline">Защищённый доступ к ресурсу</div>
          </div>
          
          <!-- Основная карточка -->
          <div class="card animate-slide-up delay-100">
            <div class="card-title">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z"/>
              </svg>
              Защищённый доступ
            </div>
            
            <div class="target-info animate-slide-up delay-200">
              <span class="target-label">Целевой ресурс:</span>
              <span class="target-url">Кто куда, а мы к зайцам</span>
            </div>
            
            <button id="secure-btn" class="btn-primary animate-slide-up delay-400">
              <svg id="spinner" class="spinner" viewBox="0 0 24 24" width="20" height="20">
                <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"/>
              </svg>
              <span>🔐 Получить безопасный доступ</span>
            </button>
            
            <div class="progress-container animate-slide-up delay-200">
              <div id="progress-bar" class="progress-bar"></div>
            </div>
            
            <div class="status" id="status">
              Авто-переход через <span id="time-left" class="countdown">20</span> сек...
            </div>
            
            <div class="manual-link">
              <a href="${accessUrl}">Вручную перейти по ссылке</a>
            </div>
          </div>
          
          <!-- Футер с информацией -->
          <div class="footer animate-slide-up delay-300">
            <div class="footer-grid">
              <div class="footer-item">
                <span class="footer-label">Время генерации</span>
                <span class="footer-value" id="gen-time">${new Date().toLocaleTimeString('ru-RU', {hour: '2-digit', minute:'2-digit'})}</span>
              </div>
              <div class="footer-item">
                <span class="footer-label">Действует до</span>
                <span class="footer-value" id="exp-time">${new Date(Date.now() + 3600000).toLocaleTimeString('ru-RU', {hour: '2-digit', minute:'2-digit'})}</span>
              </div>
              <div class="footer-item">
                <span class="footer-label">Защита</span>
                <span class="footer-value">PB</span>
              </div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
    
    return res.status(200).send(html);
  }
  
  // 2. ПРОВЕРКА ДОСТУПА
  if (path === '/access') {
    const token = req.query.t;
    
    if (token) {
      try {
        const decoded = Buffer.from(decodeURIComponent(token), 'base64').toString('utf8');
        const [timestampStr, secret] = decoded.split(':');
        const timestamp = parseInt(timestampStr);
        const now = Math.floor(Date.now() / 1000);
        
        // Проверяем срок действия (1 час)
        if (secret === TOKEN_SECRET && (now - timestamp) < 3600) {
          // Дополнительная проверка User-Agent
          const userAgent = req.headers['user-agent'] || '';
          const isBot = /bot|crawler|spider|scraper|telegrambot|whatsapp|facebookexternalhit|twitterbot|discordbot|slurp|baidu/i.test(userAgent.toLowerCase());
          
          if (isBot) {
            const botHtml = `
              <!DOCTYPE html>
              <html>
              <head>
                <meta charset="UTF-8">
                <title>Доступ запрещён</title>
                <style>
                  body {
                    background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
                    color: #f1f5f9;
                    font-family: 'Inter', sans-serif;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                    text-align: center;
                    padding: 20px;
                  }
                  .error-card {
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 20px;
                    padding: 3rem;
                    max-width: 500px;
                  }
                  .error-icon {
                    font-size: 4rem;
                    margin-bottom: 1rem;
                  }
                  h1 { color: #ef4444; margin-bottom: 1rem; }
                  a {
                    display: inline-block;
                    margin-top: 1.5rem;
                    padding: 0.75rem 1.5rem;
                    background: #6366f1;
                    color: white;
                    text-decoration: none;
                    border-radius: 8px;
                    transition: transform 0.2s;
                  }
                  a:hover { transform: translateY(-2px); }
                </style>
              </head>
              <body>
                <div class="error-card">
                  <div class="error-icon">🚫</div>
                  <h1>Доступ запрещён</h1>
                  <p>Автоматические системы и боты не могут получить доступ к этому ресурсу.</p>
                  <p>Если вы реальный пользователь, откройте ссылку в браузере напрямую.</p>
                  <a href="/">Вернуться на главную</a>
                </div>
              </body>
              </html>
            `;
            return res.status(403).send(botHtml);
          }
          
          // Логируем успешный доступ
          console.log(`Access granted from IP: ${req.headers['x-forwarded-for'] || req.connection.remoteAddress}, UA: ${userAgent.substring(0, 100)}`);
          
          // Красивый редирект с задержкой
          const successHtml = `
            <!DOCTYPE html>
            <html>
            <head>
              <meta http-equiv="refresh" content="1;url=${TARGET_URL}">
              <meta charset="UTF-8">
              <title>Успешный доступ</title>
              <style>
                body {
                  background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
                  color: #f1f5f9;
                  font-family: 'Inter', sans-serif;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  min-height: 100vh;
                  text-align: center;
                  padding: 20px;
                }
                .success-card {
                  background: rgba(255, 255, 255, 0.05);
                  backdrop-filter: blur(10px);
                  border: 1px solid rgba(255, 255, 255, 0.1);
                  border-radius: 20px;
                  padding: 3rem;
                  max-width: 500px;
                }
                .success-icon {
                  font-size: 4rem;
                  margin-bottom: 1rem;
                  animation: bounce 1s infinite;
                }
                @keyframes bounce {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(-10px); }
                }
                h1 { color: #10b981; margin-bottom: 1rem; }
                .loader {
                  width: 100%;
                  height: 4px;
                  background: rgba(255, 255, 255, 0.1);
                  border-radius: 2px;
                  margin: 2rem 0;
                  overflow: hidden;
                }
                .loader-bar {
                  width: 100%;
                  height: 100%;
                  background: linear-gradient(90deg, #10b981, #6366f1);
                  animation: load 1s linear forwards;
                }
                @keyframes load {
                  from { transform: translateX(-100%); }
                  to { transform: translateX(0); }
                }
              </style>
            </head>
            <body>
              <div class="success-card">
                <div class="success-icon">✅</div>
                <h1>Доступ разрешён!</h1>
                <p>Перенаправление на защищённый ресурс...</p>
                <div class="loader"><div class="loader-bar"></div></div>
                <p><a href="${TARGET_URL}" style="color: #94a3b8; text-decoration: none;">Нажмите здесь, если перенаправление не сработало</a></p>
              </div>
            </body>
            </html>
          `;
          return res.status(200).send(successHtml);
        }
      } catch (e) {
        console.error('Token decode error:', e.message);
      }
    }
    
    // Если токен невалиден
    const expiredHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Ссылка устарела</title>
        <style>
          body {
            background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
            color: #f1f5f9;
            font-family: 'Inter', sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            text-align: center;
            padding: 20px;
          }
          .expired-card {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 3rem;
            max-width: 500px;
          }
          .expired-icon {
            font-size: 4rem;
            margin-bottom: 1rem;
          }
          h1 { color: #f59e0b; margin-bottom: 1rem; }
          .btn {
            display: inline-block;
            margin-top: 1.5rem;
            padding: 0.75rem 1.5rem;
            background: linear-gradient(135deg, #6366f1, #4f46e5);
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            transition: transform 0.2s, box-shadow 0.2s;
          }
          .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(99, 102, 241, 0.4);
          }
        </style>
      </head>
      <body>
        <div class="expired-card">
          <div class="expired-icon">⏱️</div>
          <h1>Ссылка устарела</h1>
          <p>Срок действия защищённой ссылки истёк (максимум 1 час).</p>
          <p>Для безопасности каждая ссылка может быть использована только один раз и имеет ограниченное время действия.</p>
          <a class="btn" href="/">🔄 Получить новую ссылку</a>
        </div>
      </body>
      </html>
    `;
    return res.status(403).send(expiredHtml);
  }
  
  // 3. ROBOTS.TXT
  if (path === '/robots.txt') {
    res.setHeader('Content-Type', 'text/plain');
    return res.status(200).send(`User-agent: *\nDisallow: /\n\n# Protected gateway - no indexing allowed`);
  }
  
  // 4. 404
  const notFoundHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Страница не найдена</title>
      <style>
        body {
          background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
          color: #f1f5f9;
          font-family: 'Inter', sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          text-align: center;
          padding: 20px;
        }
        .notfound-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 3rem;
          max-width: 500px;
        }
        .notfound-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }
        h1 { color: #94a3b8; margin-bottom: 1rem; }
        .btn {
          display: inline-block;
          margin-top: 1.5rem;
          padding: 0.75rem 1.5rem;
          background: #6366f1;
          color: white;
          text-decoration: none;
          border-radius: 8px;
        }
      </style>
    </head>
    <body>
      <div class="notfound-card">
        <div class="notfound-icon">🔍</div>
        <h1>404 - Страница не найдена</h1>
        <p>Запрошенная страница не существует или была удалена.</p>
        <a class="btn" href="/">Вернуться на главную</a>
      </div>
    </body>
    </html>
  `;
  return res.status(404).send(notFoundHtml);
};
