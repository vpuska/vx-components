import {match} from "path-to-regexp";

const fn = match("/user", {end: false})


function test(path: string) {
    const r = fn(path)
    console.log(r.path);
    console.log(r.params);
}


test('/user');
test('/user/');
test('/user/123');
test('/user/123/456');