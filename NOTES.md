Cała logike fetch danych paginacje wyszukiwanie zaznaczanie nastrojów zapis wrzuciłem do jednego React Context (moods-context.tsx), żeby App i Moods mogly korzystać z tych samych danych bez przekazywania mnóstwa propsów w dół

Paginacja i wyszukiwanie są zsynchronizowane z URL przez search params w tanstack router page search dzięki temu odswieżenie strony nie resetuje stanu, i można wysłać komuś link do konkretnej strony/wyszukiwania

Wyszukiwanie ma debounce ok 400ms i resetuje strone na 0 przy każdej nowej frazie

Limit zaznaczen max 3 jest sprawdzany w toggleSelect po przekroczeniu pokazuje sie toast z komunikatem

Do requestow uzyłem prostego fetch z licznikiem zapytan requestId zeby zignorowac odpowiedz ze starszego już nieaktualnego requestu gdyby użytkownik szybko kliknał paginacje kilka razy
